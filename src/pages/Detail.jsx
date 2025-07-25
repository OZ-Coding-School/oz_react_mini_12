import { useParams } from "react-router-dom";
import movieList from "../mission1_data/data/movieListData.json";
import styled from "styled-components";

export default function Detail() {
  const { movieId } = useParams();
  console.log(movieId);
  const movie = movieList.results.find((el) => el.id === Number(movieId));

  if (!movie) {
    return <div style={{ color: "white" }}>존재하지 않는 영화입니다.</div>;
  }

  const { title, vote_average, poster_path, genre_ids, overview } = movie;

  return (
    <DetailStyled>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title + " poster"}
        className="poster_front"
      />

      <div className="info">
        <div className="title">{title}</div>
        <div className="vote_average">평점 : ⭐{vote_average}</div>
        {/* <div className="genre">{genre_ids}</div> */}
        <div className="overview">{overview}</div>
      </div>
    </DetailStyled>
  );
}

const DetailStyled = styled.div`
  display: flex;
  width: 100%;
  height: 49rem;
  background-color: #9e9e9e;
  padding: 1rem 3rem;
  gap: 2rem;

  img {
    height: 100%;
    border-radius: 0.7rem;
    box-shadow: 1px 2px 5px 3px #00000050;
  }

  .info {
    margin-left: 4rem;
    margin-top:2rem;
    min-width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    height: 100%;
    margin-right:4rem;

    .title {
      font-size: 4rem;
      font-weight: 800;
    }
    .vote_average {
        font-size : 1.2rem;
    }

    .genre {
      height: 3rem;
    }
    .overview {
      overflow-y: auto;
      font-size: 1.2rem;
      word-break: keep-all;
    }
  }
`;
