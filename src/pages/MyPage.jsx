import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";// Supabase 클라이언트 가져오기
import "../styles/MyPage.css";

function MyPage() {
  const [favorites, setFavorites] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // 찜 목록 가져오기
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);

    // 로그인된 사용자 정보 가져오기
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email);
      }
    };

    fetchUser();
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w200"; // 더 작은 이미지 사용

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      {userEmail && <p className="user-email">이메일: {userEmail}</p>}

      <h3>❤️ 찜한 영화 목록</h3>

      {favorites.length === 0 ? (
        <p>찜한 영화가 없습니다.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <Link to={`/details/${movie.id}`} key={movie.id} className="favorite-card">
              <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPage;