-- Fix security issues by setting proper search_path on functions

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update the handle_new_user function  
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email
  );
  
  -- Insert user progress
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  
  -- Insert initial module progress (Brand Assessment Audit unlocked)
  INSERT INTO public.module_progress (user_id, module_id, module_name, module_type, is_unlocked)
  VALUES (NEW.id, 'brand-assessment-audit', 'Brand Assessment Audit', 'assessment', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';