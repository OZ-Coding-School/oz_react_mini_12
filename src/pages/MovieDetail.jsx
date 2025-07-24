import movieDetailData from "../data/movieDetailData.json";

function MovieDetail() {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const movie = movieDetailData;

  return (
    <div
      style={{
        display: "flex", // 부모 div 안의 요소(이미지+텍스트)를 가로로 배치
        gap: "30px", // 이미지와 텍스트 사이에 간격
        padding: "40px", // 테두리 안쪽 여백(상하좌우)
      }}
    >
      <img
        src={baseUrl + movie.poster_path} // 이미지 경로
        alt={movie.title} // 이미지 깨지면 텍스트
        style={{ width: "300px", borderRadius: "10px" }} // 너비, 둥근 모서리
      />
      <div style={{ flex: 1 }}>
        {" "}
        <h1>{movie.title}</h1>
        <p>평점: {movie.vote_average}</p>
        <div>
          <strong>장르:</strong>{" "}
          {movie.genres
            .map(/*ex. 애미메이션, 액션, 가족, 코미디*/ (genre) => genre.name)
            .join(", ")}
        </div>
        <p style={{ marginTop: "20px", lineHeight: "1.6" }}>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
