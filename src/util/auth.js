import { supabase } from "./supabaseClient";

export async function signIn(formData, isValid) {
  if (!isValid) return;
  const { email, password } = formData;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp(formData, isValid) {
  if (!isValid) return;
  const { email, password, userName } = formData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userName,
        avatarUrl: "/profileImgs/01.jpg",
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function socialSignIn(provider) {
  const redirectTo = "http://localhost:5173/auth/callback";

  if (!["google", "kakao"].includes(provider)) return;

  await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });
}

