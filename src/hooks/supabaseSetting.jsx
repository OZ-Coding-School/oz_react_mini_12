// src/hooks/supabaseSetting.jsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
const PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;

export const supabase = createClient(PROJECT_URL, API_KEY);

export function useSupabaseAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return { user, setUser };
}

export async function logout() {
  await supabase.auth.signOut();
}

export default supabase;
