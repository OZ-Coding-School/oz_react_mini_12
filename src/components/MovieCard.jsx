import { Link } from 'react-router-dom';

export function MovieCard({id,title, poster, rating}) {
    const imageUrl = `https://image.tmdb.org/t/p/w500`

    return (
        <>
        <Link to={`/detail/${id}`}>
        <div className='movie-card'
        style={{backgroundColor: '#a9a9a924',
            padding: '15px',
            borderRadius: '15px',
            
        }}>
            <img src={imageUrl + poster} 
            alt={title}
            style={{width: '240px'}}/>
            <h3>{title}</h3>
            <p>평점 {rating}</p>
        </div>
        </Link>
        </>
    )
}

