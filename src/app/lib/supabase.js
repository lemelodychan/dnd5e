import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajvnoafieyfgmlygjqgb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdm5vYWZpZXlmZ21seWdqcWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NjA0NzMsImV4cCI6MjAyNjQzNjQ3M30.ykevkwBPwyXi856hqhzx5XbPHN-Xd8H_0wm3mg3S7ko";
export const supabase = createClient(supabaseUrl, supabaseKey);