// src/contexts/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// context 생성
const UserContext = createContext();

// context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LocalStorage에서 유저 정보 불러오는 함수
  const getUserInfo = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to load user from LocalStorage:', err);
    }
  };

  // 마운트 시 실행
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// context 사용 hook
export const useUser = () => useContext(UserContext);
