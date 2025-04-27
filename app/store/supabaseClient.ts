// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Missing Supabase environment variables");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://guhkesabjfqmhsglpxzr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1aGtlc2FiamZxbWhzZ2xweHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTQwMzQsImV4cCI6MjA2MTE3MDAzNH0.vgTi7TO7gVLWuKkx1ixNXZ59MPGx9iIQWG-p1B0bNKg';
 if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
   }
  
export const supabase = createClient(supabaseUrl, supabaseKey)