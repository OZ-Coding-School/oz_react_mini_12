import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './MovieCard.css';

const API_TOKEN = import.meta.env.VITE_REACT_APP_API_TOKEN;

const FilteredMovieCard = ({ movie }) => {
  const [rating, setRating] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
            },
          }
        );
        const data = await res.json();
        const krRating = data.results.find(r => r.iso_3166_1 === 'KR');
        const cert = krRating?.release_dates?.[0]?.certification || '';

        // 허용할 등급만 나열
        const allowRatings = ['전체이용가', 'ALL', '7', '12', '15'];

        if (allowRatings.includes(cert)) {
          setRating(cert);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch {
        setIsVisible(false);
      }
    };

    fetchRating();
  }, [movie.id]);

  if (!isVisible) return null;

  return <MovieCard movie={movie} rating={rating} />;
};

export default FilteredMovieCard;
