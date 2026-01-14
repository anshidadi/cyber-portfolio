-- Fix security: Remove permissive write policies and restrict to admin only
-- First, drop the insecure policies on projects table
DROP POLICY IF EXISTS "Anyone can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON public.projects;

-- Drop the insecure policies on skills table
DROP POLICY IF EXISTS "Anyone can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Anyone can update skills" ON public.skills;
DROP POLICY IF EXISTS "Anyone can delete skills" ON public.skills;

-- Create restrictive policies that deny all write access by default
-- Admin access will be handled through the service role key or edge functions
CREATE POLICY "No public insert on projects" 
ON public.projects 
FOR INSERT 
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "No public update on projects" 
ON public.projects 
FOR UPDATE 
TO anon, authenticated
USING (false);

CREATE POLICY "No public delete on projects" 
ON public.projects 
FOR DELETE 
TO anon, authenticated
USING (false);

CREATE POLICY "No public insert on skills" 
ON public.skills 
FOR INSERT 
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "No public update on skills" 
ON public.skills 
FOR UPDATE 
TO anon, authenticated
USING (false);

CREATE POLICY "No public delete on skills" 
ON public.skills 
FOR DELETE 
TO anon, authenticated
USING (false);