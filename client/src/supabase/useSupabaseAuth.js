import { useUser } from "../context/UserContext.jsx";
import supabase from "./supabaseClient";

function getLocalUserInfo() {
  const data = localStorage.getItem("userInfo");
  return data ? JSON.parse(data) : null;
}

export default function useSupabaseAuth() {
  const { setUser } = useUser();

  const signUp = async ({ email, password, userName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { userName },
      },
    });
    if (error) return { error };
    await getUserInfo();
    return { user: data.user };
  };

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error };
    await getUserInfo();
    return { user: data.user };
  };

  const getUserInfo = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      const userInfo = {
        id: data.user.id,
        email: data.user.email,
        userName: data.user.user_metadata?.userName || "",
        profileImageUrl: "",
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);
      return userInfo;
    } else {
      localStorage.removeItem("userInfo");
      setUser(null);
      return null;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const loginWithKakao = async () => {
    await supabase.auth.signInWithOAuth({ provider: "kakao" });
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return {
    signUp,
    login,
    logout,
    getUserInfo,
    loginWithKakao,
    loginWithGoogle,
  };
}
