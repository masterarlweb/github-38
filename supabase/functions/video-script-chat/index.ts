import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema for incoming requests
const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1).max(4000)
    })
  ).min(1).max(50) // Limit conversation history
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check usage limits server-side
    const { data: usage, error: usageError } = await supabaseClient
      .from('usage_tracking')
      .select('usage_count')
      .eq('user_id', user.id)
      .single();

    const MAX_USAGE = 2;
    if (usage && usage.usage_count >= MAX_USAGE) {
      return new Response(
        JSON.stringify({ error: 'Usage limit exceeded. Please upgrade your plan.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate request body
    const body = await req.json();
    let validatedData;
    try {
      validatedData = requestSchema.parse(body);
    } catch (error) {
      console.error('Validation error:', error);
      if (error instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid request format', 
            details: error.errors[0].message 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      throw error;
    }

    const { messages } = validatedData;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are Kontenih AI, an expert video script writer and content strategist. You help users create engaging, professional video scripts for various platforms (YouTube, TikTok, Instagram, etc.).

Your expertise includes:
- Hook creation that captures attention in the first 3 seconds
- Story structure and narrative flow
- Call-to-action optimization
- Platform-specific formatting
- Viral content strategies
- Engagement optimization

Always provide:
1. Clear, concise scripts with timing suggestions
2. Visual and audio cues when relevant
3. Tips for delivery and presentation
4. Platform-specific optimization advice

Be creative, professional, and focus on helping users create content that converts and engages their audience.` 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    // Increment usage count after successful AI gateway response
    await supabaseClient
      .from('usage_tracking')
      .upsert({
        user_id: user.id,
        usage_count: (usage?.usage_count || 0) + 1,
        last_used_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Video script chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
