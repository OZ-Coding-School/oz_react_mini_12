import { supabase } from "../supabase";

export const signup = async (emailInput, nameInput, passwordInput) => {
  // 1. Supabase에 회원가입 시도
  const { data, error } = await supabase.auth.signUp({
    email: emailInput,
    password: passwordInput,
    options: {
      data: {
        name: nameInput,
      },
    },
  });

  if (error) {
    console.error("회원가입 실패:", error.message);
  } else {
    console.log("회원가입 성공!", data);
  }

  console.log("회원가입 성공:", data);

  // 2. 회원가입 성공했으면 → users 테이블에도 정보 저장
  const userId = data.user.id; // 유저의 고유 ID 가져오기

  const { error: insertError } = await supabase
    .from("users") // ← 네가 만든 users 테이블
    .insert([
      {
        id: userId,
        name: nameInput,
        email: emailInput,
      },
    ]);

  if (insertError) {
    console.error("유저 정보 저장 실패:", insertError.message);
  } else {
    console.log("유저 정보 저장 성공!");
  }
  // display name에 nameInput 업데이트
  await supabase.auth.updateUser({
    data: {
      name: nameInput,
      full_name: nameInput,
    },
  });
};
