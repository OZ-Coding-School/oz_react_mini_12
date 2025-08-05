import { useLoginStore } from "../store/logIn_store";
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

export const fetchLikes = async () => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) return [];

  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", user.data.user.id);

  if (error) {
    console.error("찜 목록 불러오기 실패", error.message);
    return [];
  }

  return data;
};

export async function like(movie) {
  const { addLike } = useLoginStore.getState();
  const user = supabase.auth.getUser();

  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }

  const { id, title, poster_path } = movie;

  const { data, error } = await supabase
    .from("likes")
    .insert({
      movie_id: id,
      title,
      poster_path,
    })
    .select()
    .single();

  if (error) {
    console.error("찜하기 실패", error.message);
  } else {
    console.log("찜 완료!");
    addLike(data);
  }
}

export async function unLike(movie) {
  const { removeLike } = useLoginStore.getState();
  const userObj = await supabase.auth.getUser();
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", userObj.data.user.id)
    .eq("movie_id", movie.id);

  if (error) {
    console.error("찜 취소 실패", error.message);
  } else {
    console.log("찜 제거 완료!");
    removeLike(movie.id);
  }
}

export async function loadLikesToStore() {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) return;

  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", user.user.id);

  if (error) {
    console.error("찜 목록 불러오기 실패", error.message);
    return;
  }

  const { setLikes } = useLoginStore.getState();
  setLikes(data);
}
