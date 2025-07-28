import React from 'react';

function NavBar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',// 스크롤 해도 상단에 고정
      top: 0,
      zIndex: 1000,// 다른 요소 위에 표시
    }}>
      <h1>영화 앱</h1>
      <div>
        <input type="text" placeholder="검색..." style={{ marginRight: '10px' }} />
        <button>로그인</button>
      </div>
    </nav>
  );
}

export default NavBar;