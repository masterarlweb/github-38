-- Add INSERT policy for profiles table to allow trigger to create profiles
CREATE POLICY "System can insert profiles"
ON public.profiles
FOR INSERT
WITH CHECK (true);

-- Add INSERT policy for usage_tracking to allow trigger to create usage records
CREATE POLICY "System can insert usage tracking"
ON public.usage_tracking
FOR INSERT
WITH CHECK (true);

-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();