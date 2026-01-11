-- Create a table for skills
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 80,
  color TEXT NOT NULL DEFAULT 'cyan',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Skills are viewable by everyone" 
ON public.skills 
FOR SELECT 
USING (true);

-- Create policies for admin access (anyone can modify for now since we're using simple password)
CREATE POLICY "Anyone can insert skills" 
ON public.skills 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update skills" 
ON public.skills 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete skills" 
ON public.skills 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_skills_updated_at
BEFORE UPDATE ON public.skills
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();