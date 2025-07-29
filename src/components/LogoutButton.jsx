import React from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 실패:", error.message);
      alert("로그아웃에 실패했습니다.");
      return;
    }
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{
      padding: "8px 16px",
      borderRadius: "6px",
      backgroundColor: "#555",
      color: "white",
      border: "none",
      cursor: "pointer"
    }}>
      로그아웃
    </button>
  );
}

export default LogoutButton;