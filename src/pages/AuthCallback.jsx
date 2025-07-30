import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../util/supabaseClient";


export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("세션 가져오기 실패:", error);
        return;
      }

      if (data?.session) {
        console.log("로그인 성공!", data.session.user);
        navigate("/");
      }
    };

    handleLogin();
  }, []);

  return (
    <div>
      <h1>로그인 처리 중입니다...</h1>
    </div>
  );
}
