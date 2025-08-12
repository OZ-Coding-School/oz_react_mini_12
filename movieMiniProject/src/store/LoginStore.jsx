import { create } from "zustand";
import { supabase } from "../supabase";

export const useLoginStore = create((set) => ({
  isUser: false,

  setIsUser: (state) => set(() => ({ isUser: state })),

  logInWithEmail: async (e, emailInput, passwordInput) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });

    if (error) {
      console.error("로그인 실패:", error.message);
      set(() => ({ isUser: false }));
      alert("로그인 실패: " + error.message);
    } else {
      set(() => ({ isUser: true }));
      console.log("로그인 성공:", data);
    }
  },

  logInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(`error : `, error);
    } else {
      console.log("google 로그인 성공:", data);
      set(() => ({ isUser: true }));
    }
  },

  logInWithKakao: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    if (error) {
      console.log(`error : `, error);
    } else {
      console.log("kakao 로그인 성공:", data);
      set(() => ({ isUser: true }));
    }
  },

  logInWithGithub: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.log(`error : `, error);
    } else {
      console.log("github 로그인 성공:", data);
      set(() => ({ isUser: true }));
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // console.error("로그아웃 실패:", error.message);
      set(() => ({ isUser: true }));
      alert("로그아웃 실패: " + error.message);
      return false;
    } else {
      // console.log("로그아웃 성공:");
      set(() => ({ isUser: false }));
      return true;
    }
  },
}));
