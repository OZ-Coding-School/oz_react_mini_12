// src/hooks/useSupabaseAuth.js
import { supabase } from '../lib/supabase';

export const signUp = async ({ email, password, userName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { userName },
    },
  });

  if (error) throw error;
  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // LocalStorage에 user 저장
  localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  localStorage.removeItem('user');
};

export const getUserInfo = () => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error('유저 정보를 불러오는 데 실패했습니다:', e);
    return null;
  }
};
