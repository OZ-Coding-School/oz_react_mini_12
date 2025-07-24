import React, { useState } from "react";

export default function SignupModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    alert("가입이 완료되었습니다.");
    onClose(); // 닫기
  };

  return (
    /* 회원가입 Modal로 구현하기 */
    <div  className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-6 shadow-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center">OZFlix 회원가입</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">이메일</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">비밀번호 확인</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
          >
            가입하기
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}