// 재사용성: 나중에 다른 페이지나 컴포넌트에서도 사용할 수 있도록 MovieCard 컴포넌트를 만든다.
// 가독성: App.jsx가 너무 길어지는 것을 방지
// 유지보수:  디자인/로직 바꾸기 쉬움.
import { useNavigate } from "react-router-dom";

function MovieCard({ title, posterPath, voteAverage }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate(); // 페이지 이동

  return (
    <div
      className="movie-card"
      onClick={() => navigate("/details")} // 클릭 시 이동
      style={{ cursor: "pointer" }}
    >
      <img src={baseUrl + posterPath} alt={title} />
      <h3>{title}</h3>
      <p>평점: {voteAverage}</p>
    </div>
  );
}

export default MovieCard;
