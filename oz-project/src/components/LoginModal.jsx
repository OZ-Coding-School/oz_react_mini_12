import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import useAuthStore from "../store/zustand";

export default function LoginModal({ onClose }) {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");     // error메세지 관리

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      login(data.user);
      onClose();
    }
  };

  return (
    <div    className="fixed inset-0 flex items-center justify-center z-50 "
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">로그인</h2>

        {errorMsg && (
            <div className="mb-4 text-red-400 text-sm text-center">
                {errorMsg}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">이메일</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력해주세요."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">패스워드</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="패스워드를 입력해주세요."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
