// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://owtzetkguakwakqifvfq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dHpldGtndWFrd2FrcWlmdmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMDg4OTYsImV4cCI6MjA2MDg4NDg5Nn0.dD2q9_4OjDblvArZB9Bo3kKJR_xPBkDcmdVX9mvLzRA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);