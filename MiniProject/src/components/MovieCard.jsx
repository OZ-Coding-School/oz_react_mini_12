import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ id, title, poster_path, vote_average }) {
    const navigate = useNavigate();
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const handleClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div style={styles.card} onClick={handleClick}>
            <img src={imageUrl} alt={title} style={styles.image} />
            <h3>{title}</h3>
            <p>평점: {vote_average}</p>
        </div>
    );
}

const styles = {
    card: {
        width: '200px',
        margin: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
    },
};

export default MovieCard;
