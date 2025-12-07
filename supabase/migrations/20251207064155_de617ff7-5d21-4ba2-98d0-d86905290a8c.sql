-- Create campaigns table for tracking marketing campaigns
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  platform TEXT DEFAULT 'instagram',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'completed', 'paused')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  ai_strategy TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scheduled_posts table for content scheduling
CREATE TABLE public.scheduled_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  caption TEXT,
  hashtags TEXT[],
  media_urls TEXT[],
  platform TEXT DEFAULT 'instagram',
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('draft', 'scheduled', 'posted', 'failed')),
  ai_recommended_time TIMESTAMP WITH TIME ZONE,
  engagement_prediction JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create carousel_templates table for carousel builder
CREATE TABLE public.carousel_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slides JSONB NOT NULL DEFAULT '[]',
  template_type TEXT DEFAULT 'custom',
  is_ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics_data table for performance tracking
CREATE TABLE public.analytics_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.scheduled_posts(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  platform TEXT DEFAULT 'instagram',
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create creator_collaborations table for creator hub
CREATE TABLE public.creator_collaborations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  creator_name TEXT NOT NULL,
  creator_handle TEXT,
  platform TEXT DEFAULT 'instagram',
  followers_count INTEGER,
  engagement_rate DECIMAL(5,2),
  collaboration_type TEXT DEFAULT 'content',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ecommerce_products table for e-commerce integration
CREATE TABLE public.ecommerce_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_url TEXT,
  price DECIMAL(12,2),
  currency TEXT DEFAULT 'IDR',
  linked_posts TEXT[],
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_shortcuts table to track shortcut actions from AI
CREATE TABLE public.ai_shortcuts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  shortcut_type TEXT NOT NULL,
  shortcut_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'executed', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carousel_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_shortcuts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaigns
CREATE POLICY "Users can view own campaigns" ON public.campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own campaigns" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own campaigns" ON public.campaigns FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own campaigns" ON public.campaigns FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for scheduled_posts
CREATE POLICY "Users can view own scheduled_posts" ON public.scheduled_posts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own scheduled_posts" ON public.scheduled_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scheduled_posts" ON public.scheduled_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scheduled_posts" ON public.scheduled_posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for carousel_templates
CREATE POLICY "Users can view own carousel_templates" ON public.carousel_templates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own carousel_templates" ON public.carousel_templates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own carousel_templates" ON public.carousel_templates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own carousel_templates" ON public.carousel_templates FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for analytics_data
CREATE POLICY "Users can view own analytics_data" ON public.analytics_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own analytics_data" ON public.analytics_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own analytics_data" ON public.analytics_data FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own analytics_data" ON public.analytics_data FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for creator_collaborations
CREATE POLICY "Users can view own creator_collaborations" ON public.creator_collaborations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own creator_collaborations" ON public.creator_collaborations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own creator_collaborations" ON public.creator_collaborations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own creator_collaborations" ON public.creator_collaborations FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for ecommerce_products
CREATE POLICY "Users can view own ecommerce_products" ON public.ecommerce_products FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own ecommerce_products" ON public.ecommerce_products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ecommerce_products" ON public.ecommerce_products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ecommerce_products" ON public.ecommerce_products FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for ai_shortcuts
CREATE POLICY "Users can view own ai_shortcuts" ON public.ai_shortcuts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own ai_shortcuts" ON public.ai_shortcuts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ai_shortcuts" ON public.ai_shortcuts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ai_shortcuts" ON public.ai_shortcuts FOR DELETE USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scheduled_posts_updated_at BEFORE UPDATE ON public.scheduled_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_carousel_templates_updated_at BEFORE UPDATE ON public.carousel_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_creator_collaborations_updated_at BEFORE UPDATE ON public.creator_collaborations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ecommerce_products_updated_at BEFORE UPDATE ON public.ecommerce_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();