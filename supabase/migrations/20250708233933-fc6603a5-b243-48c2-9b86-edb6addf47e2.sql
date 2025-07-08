-- Drop existing RLS policies
DROP POLICY "Users can view their own AWS credentials" ON public.aws_credentials;
DROP POLICY "Users can insert their own AWS credentials" ON public.aws_credentials;
DROP POLICY "Users can update their own AWS credentials" ON public.aws_credentials;
DROP POLICY "Users can delete their own AWS credentials" ON public.aws_credentials;

-- Disable Row Level Security
ALTER TABLE public.aws_credentials DISABLE ROW LEVEL SECURITY;

-- Make user_id nullable since we won't require authentication
ALTER TABLE public.aws_credentials ALTER COLUMN user_id DROP NOT NULL;

-- Add a default row ID for global credentials storage
ALTER TABLE public.aws_credentials ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;

-- Create index for default credentials
CREATE INDEX IF NOT EXISTS idx_aws_credentials_default ON public.aws_credentials(is_default);