import React, { useEffect, useState, useRef } from 'react';
import { useSupabaseAuth } from '../hooks/supabaseSetting';
import { Link } from 'react-router-dom';
import './MyPage.css';

export default function MyPage() {
  const { user } = useSupabaseAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const storedBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${user.id}`)) || [];
    setBookmarks(storedBookmarks);

    // localStorage에 저장된 프로필 이미지가 있으면 그걸 우선 불러오고,
    // 없으면 유저 메타데이터에서 불러오기
    const storedProfileImage = localStorage.getItem(`profileImage_${user.id}`);
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    } else {
      setProfileImage(user.user_metadata?.avatar_url || 'https://via.placeholder.com/100');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="mypage-container">
        <h2>로그인이 필요합니다.</h2>
      </div>
    );
  }

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // localStorage에 저장해서 새로고침해도 유지되도록 함
        localStorage.setItem(`profileImage_${user.id}`, reader.result);

        // 여기서 서버 업로드 후 유저 프로필 업데이트 로직 추가 가능
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">마이페이지</h2>

      <div
        className="mypage-avatar"
        style={{ cursor: 'pointer' }}
        onClick={handleProfileClick}
        title="프로필 사진 클릭해서 변경"
      >
        <img src={profileImage} alt="프로필" />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="mypage-info">
        <p><strong>이름:</strong> {user.user_metadata?.name || '이름 없음'}</p>
        <p><strong>이메일:</strong> {user.email}</p>
        <p><strong>가입날짜:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>북마크한 영화</h3>
        {bookmarks.length === 0 && <p>저장된 북마크가 없습니다.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookmarks.map(b => (
            <li key={b.id} style={{ marginBottom: 15, display: 'flex', alignItems: 'center' }}>
              <Link to={`/movie/${b.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w92${b.poster_path}`}
                  alt={b.title}
                  style={{ borderRadius: 6, marginRight: 10 }}
                />
                <span>{b.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}