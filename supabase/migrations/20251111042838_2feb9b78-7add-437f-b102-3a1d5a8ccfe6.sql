-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "System can insert profiles" ON public.profiles;

-- Drop the overly permissive insert policy for usage_tracking
DROP POLICY IF EXISTS "System can insert usage tracking" ON public.usage_tracking;

-- The trigger function with SECURITY DEFINER will still work 
-- because it bypasses RLS policies when creating profiles
-- No new policies needed - only authenticated users can update/view their own profiles