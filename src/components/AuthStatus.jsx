import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function AuthStatus() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 현재 로그인된 유저 가져오기
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getUser();

    // 로그인/로그아웃 상태 변경 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 로그아웃 함수
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/"); // 로그아웃 후 홈으로 이동
  };

  return (
    <div style={{ textAlign: "right", padding: "10px", color: "white" }}>
      {user ? (
        <>
          <span>{user.email} 님 &nbsp;</span>
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid white", color: "white", padding: "6px 10px", borderRadius: "5px", cursor: "pointer" }}>
            로그아웃
          </button>
        </>
      ) : (
        <span>로그인되지 않음</span>
      )}
    </div>
  );
}

export default AuthStatus;