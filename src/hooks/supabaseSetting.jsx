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


// 추가: 이메일 중복 확인 함수
export async function checkEmailExists(email) {
  if (!email) return false;

  // 비밀번호를 모르는 상태에서는 임시 비밀번호를 사용해서 로그인 시도
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: 'temporary_password_for_check', // 존재 확인만을 위한 임시 비밀번호
  });

  // 로그인 성공 -> 이미 존재하는 이메일
  // 로그인 실패라도 error.message에 "Invalid login credentials"이면 존재하는 이메일
  if (data?.user || (error && error.message.includes('Invalid login credentials'))) {
    return true;
  }
  return false;
}