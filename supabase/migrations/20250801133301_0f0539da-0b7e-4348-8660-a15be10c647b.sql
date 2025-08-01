-- Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.audit_status AS ENUM ('draft', 'in_progress', 'completed');
CREATE TYPE public.module_type AS ENUM ('assessment', 'learning', 'strategy_building');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  company_name TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_module_id TEXT,
  overall_completion_percentage INTEGER DEFAULT 0,
  brand_health_score INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create module_progress table
CREATE TABLE public.module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  module_type module_type NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  is_unlocked BOOLEAN DEFAULT false,
  completion_percentage INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 100,
  time_spent INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, module_id)
);

-- Create brand_audits table
CREATE TABLE public.brand_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  status audit_status DEFAULT 'draft',
  total_score INTEGER DEFAULT 0,
  max_possible_score INTEGER DEFAULT 100,
  completion_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create module_responses table
CREATE TABLE public.module_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  response_data JSONB NOT NULL,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, module_id, question_id)
);

-- Create brand_foundation table
CREATE TABLE public.brand_foundation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  mission_statement TEXT,
  vision_statement TEXT,
  core_values JSONB,
  brand_personality JSONB,
  unique_value_proposition TEXT,
  brand_story TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create audience_personas table
CREATE TABLE public.audience_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  persona_name TEXT NOT NULL,
  demographics JSONB,
  psychographics JSONB,
  pain_points JSONB,
  goals JSONB,
  preferred_channels JSONB,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create competitive_analysis table
CREATE TABLE public.competitive_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  competitor_name TEXT NOT NULL,
  competitor_type TEXT, -- direct, indirect, aspirational
  strengths JSONB,
  weaknesses JSONB,
  positioning JSONB,
  pricing_strategy TEXT,
  market_share TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create brand_blueprints table
CREATE TABLE public.brand_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  positioning_statement TEXT,
  brand_pillars JSONB,
  messaging_framework JSONB,
  visual_identity_guidelines JSONB,
  voice_and_tone JSONB,
  implementation_roadmap JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_foundation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audience_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitive_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_blueprints ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_progress
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for module_progress
CREATE POLICY "Users can view own module progress" ON public.module_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own module progress" ON public.module_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own module progress" ON public.module_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for brand_audits
CREATE POLICY "Users can view own audits" ON public.brand_audits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own audits" ON public.brand_audits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own audits" ON public.brand_audits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own audits" ON public.brand_audits FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for module_responses
CREATE POLICY "Users can view own responses" ON public.module_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own responses" ON public.module_responses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own responses" ON public.module_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for brand_foundation
CREATE POLICY "Users can view own brand foundation" ON public.brand_foundation FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own brand foundation" ON public.brand_foundation FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own brand foundation" ON public.brand_foundation FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for audience_personas
CREATE POLICY "Users can view own personas" ON public.audience_personas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own personas" ON public.audience_personas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own personas" ON public.audience_personas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own personas" ON public.audience_personas FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for competitive_analysis
CREATE POLICY "Users can view own competitive analysis" ON public.competitive_analysis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own competitive analysis" ON public.competitive_analysis FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own competitive analysis" ON public.competitive_analysis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own competitive analysis" ON public.competitive_analysis FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for brand_blueprints
CREATE POLICY "Users can view own brand blueprint" ON public.brand_blueprints FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own brand blueprint" ON public.brand_blueprints FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own brand blueprint" ON public.brand_blueprints FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_module_progress_updated_at BEFORE UPDATE ON public.module_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_brand_audits_updated_at BEFORE UPDATE ON public.brand_audits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_module_responses_updated_at BEFORE UPDATE ON public.module_responses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_brand_foundation_updated_at BEFORE UPDATE ON public.brand_foundation FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_audience_personas_updated_at BEFORE UPDATE ON public.audience_personas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_competitive_analysis_updated_at BEFORE UPDATE ON public.competitive_analysis FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_brand_blueprints_updated_at BEFORE UPDATE ON public.brand_blueprints FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();