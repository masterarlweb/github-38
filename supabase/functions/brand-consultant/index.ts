import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const requestSchema = z.object({
  message: z.string().min(1, "Message is required").max(4000, "Message must be less than 4000 characters"),
  tool: z.string().optional()
});

const MAX_USAGE = 100;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check usage limits
    const { data: usage } = await supabase
      .from('usage_tracking')
      .select('usage_count')
      .eq('user_id', user.id)
      .single();

    if (usage && usage.usage_count >= MAX_USAGE) {
      return new Response(
        JSON.stringify({ error: 'Usage limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input with Zod schema
    const body = await req.json();
    const validation = requestSchema.safeParse(body);
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error.errors[0].message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, tool } = validation.data;

    // Use AI API directly instead of N8N webhook for independence
    const AI_API_URL = Deno.env.get("AI_API_URL") || "https://openrouter.ai/api/v1/chat/completions";
    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    const AI_MODEL = Deno.env.get("AI_MODEL") || "openrouter/auto";
    const AI_HTTP_REFERER = Deno.env.get("AI_HTTP_REFERER");
    const AI_TITLE = Deno.env.get("AI_TITLE") || "Kontenih AI";
    
    // Fallback to N8N if AI_API_KEY not configured (for backward compatibility)
    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    
    if (!AI_API_KEY && !n8nWebhookUrl) {
      return new Response(
        JSON.stringify({ error: 'AI_API_KEY or N8N_WEBHOOK_URL must be configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use AI API if configured, otherwise fallback to N8N
    if (AI_API_KEY) {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      };

      if (AI_HTTP_REFERER) headers["HTTP-Referer"] = AI_HTTP_REFERER;
      if (AI_TITLE) headers["X-Title"] = AI_TITLE;

      const systemPrompt = `You are Kontenih AI, an expert brand consultant and marketing strategist. You help businesses develop their brand identity, marketing strategies, and content plans.

Your expertise includes:
- Brand positioning and identity development
- Marketing strategy and campaign planning
- Content strategy for social media
- Target audience analysis
- Competitive analysis
- Growth strategies

Always provide:
1. Clear, actionable advice
2. Specific recommendations tailored to the business
3. Practical examples when relevant
4. Step-by-step guidance when appropriate

Be professional, insightful, and focus on helping users grow their business through effective branding and marketing.`;

      const aiResponse = await fetch(AI_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
        }),
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error("AI API error:", aiResponse.status, errorText);
        return new Response(
          JSON.stringify({ error: "AI service error" }),
          { status: aiResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const aiData = await aiResponse.json();
      const output = aiData.choices?.[0]?.message?.content || 'Maaf, terjadi kesalahan dalam mendapatkan respons.';

      // Increment usage count after successful response
      await supabase.from('usage_tracking').upsert({
        user_id: user.id,
        usage_count: (usage?.usage_count || 0) + 1,
        last_used_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

      return new Response(
        JSON.stringify({ output, response: output }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fallback to N8N webhook if AI_API_KEY not configured

    const params = new URLSearchParams({
      message,
      tool: tool || '',
      timestamp: new Date().toISOString(),
    });

    const n8nResponse = await fetch(`${n8nWebhookUrl}?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!n8nResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Webhook error: ${n8nResponse.status}` }),
        { status: n8nResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await n8nResponse.json();

    // Increment usage count after successful response
    await supabase.from('usage_tracking').upsert({
      user_id: user.id,
      usage_count: (usage?.usage_count || 0) + 1,
      last_used_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
