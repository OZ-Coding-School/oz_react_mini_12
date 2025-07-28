import React from 'react';
import { Link } from 'react-router-dom';

// 개별 props로 id, poster, title, rating을 받도록 변경
function MovieCard({ id, poster, title, rating }) {
  return (// Link 컴포넌트로 감싸서 클릭하면 /detail/영화ID 경로로 이동하게 해줌
    <Link to={`/detail/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
      }}>{/* poster props를 직접 사용 */}
        <img src={poster} alt={title} style={{ width: '100%', borderRadius: '4px', marginBottom: '10px' }} />
        <h3 style={{
          fontSize: '1.1em',
          margin: '0 0 5px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{title}</h3>   {/* rating props를 직접 사용 */}
        <p style={{ fontSize: '0.9em', color: '#666', margin: '0' }}>평점: {rating}</p>
      </div>
    </Link>
  );
}

export default MovieCard;