import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './MovieDetail.module.css';
import { getMovieDetail } from '../../api';

export default function movieDetail(movieDetail) {
  const { id } = useParams();
  const [detail, setDetail] = useState(movieDetail);

  useEffect(() => {
    async function loadMovieDetail() {
      if (id) {
        const fetchData = await getMovieDetail(id);
        setDetail(fetchData);
      } else {
        setDetail(null);
      }
    }
    loadMovieDetail();
  }, [id]);

  const { backdrop_path, poster_path, title, vote_average, genres, overview } =
    detail;
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  const displayImagePath = backdrop_path || poster_path;
  const src = displayImagePath ? `${baseUrl}${displayImagePath}` : null;

  return (
    <div className={styles.container}>
      <img src={src} alt={title} className={styles.poster} />
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.rating}>
            {typeof vote_average === 'number' ? vote_average.toFixed(2) : 'N/A'}
          </span>
        </div>
        <div className={styles.genres}>
          {genres &&
            genres.map((genre) => <span key={genre.id}>{genre.name} </span>)}
        </div>
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
}
