import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://waoowdmkclypelijwhqn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhb293ZG1rY2x5cGVsaWp3aHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNTkwNjMsImV4cCI6MjA1ODYzNTA2M30.r6b1KQLT3V2u09ctlFyAiNJeNdtm3oKOH12bNf6f8Zs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Message {
  id: number;
  name: string;
  message: string;
  status: string; 
  created_at: string;
}


export async function getMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addMessage(name: string, message: string, status: string) {
  const created_at = new Date().toISOString(); 

  const { data, error } = await supabase
    .from("messages")
    .insert([{ name, message, status, created_at }])
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export default supabase;
