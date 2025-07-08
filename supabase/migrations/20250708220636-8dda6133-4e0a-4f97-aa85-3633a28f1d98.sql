-- Create table to store AWS credentials securely
CREATE TABLE public.aws_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  access_key_id TEXT NOT NULL,
  secret_access_key TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT 'us-east-1',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.aws_credentials ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own AWS credentials" 
ON public.aws_credentials 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AWS credentials" 
ON public.aws_credentials 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AWS credentials" 
ON public.aws_credentials 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AWS credentials" 
ON public.aws_credentials 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_aws_credentials_updated_at
BEFORE UPDATE ON public.aws_credentials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();