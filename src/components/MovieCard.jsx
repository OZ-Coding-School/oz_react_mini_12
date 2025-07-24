import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function MovieCard({ movie }) {
    const { title, vote_average, poster_path, id } = movie;
    const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/detail/${id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title + " poster"}
      />
      <div className="title">{title}</div>
      <div className="vote_average">평점 : ⭐{vote_average}</div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin-bottom: 2rem;
  background-color: #353535;
  border-radius: 1rem;
  padding: 1rem;

  transition:all 0.2s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    background-color:#4b4b4b;
  }

  img {
    width: 18rem;
    height: 27rem;
    border-radius: 0.5rem;
  }
  .title,
  .vote_average {
    text-align: center;
  }
  .title {
    height: 6rem;
    font-size: 2.2rem;
    font-weight: 700;
    color: white;
    word-break: keep-all;
  }
  .vote_average {
    font-size: 1.2rem;
    font-weight: 400;
    color: gray;
  }
`;
