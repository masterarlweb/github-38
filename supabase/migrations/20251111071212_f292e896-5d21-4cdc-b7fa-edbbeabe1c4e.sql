-- Add constraint to prevent negative usage counts
ALTER TABLE public.usage_tracking 
ADD CONSTRAINT usage_count_non_negative CHECK (usage_count >= 0);

-- Add index for better query performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id);