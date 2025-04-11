
import { createClient } from '@supabase/supabase-js';

// Get the environment variables or use the static values from the client.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vyatzuljgwtrybtkdlbl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YXR6dWxqZ3d0cnlidGtkbGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzYwNzUsImV4cCI6MjA1OTk1MjA3NX0.XSBQnCaZexaOYk1i7csF3H3j4p4x4OKEIBECUybpX_0';

// Create the Supabase client with error handling
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Export a function to check if Supabase is configured properly
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
