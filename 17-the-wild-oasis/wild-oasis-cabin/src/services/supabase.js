import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dwwurjjcuqaotnysxatb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3d3VyampjdXFhb3RueXN4YXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzMTgwOTQsImV4cCI6MjAwNzg5NDA5NH0.Y9XN_2EndiL1ctzBIcc9DWo5dX85oT4ex70Hj_91L18";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
