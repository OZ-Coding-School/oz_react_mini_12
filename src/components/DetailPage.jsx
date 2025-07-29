import styled from 'styled-components';
// import data from '../assets/data/movieDetailData.json';
import { imageUrl } from './config';
import { useParams } from 'react-router-dom';


const Poster = styled.img`
    width: 300px;
    border-radius: 12px;
`

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
` 

const TitleRating = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    max-width: 300px;
`

const Genre = styled.div`
    font-size: 16px;
    color: white;
`

const Overview = styled.p`
    font-size: 15px;
    line-height: 1.6;
    max-width: 500px;
    color: white;
`

const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

function DetailPage ({movies}) {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === Number(id))
    
    if(!movie) {
        return <h3 style={{color: "white"
        }}>영화를 찾을 수 없습니다</h3>
    }
    
    return (
        <>
            <div className='movie-box'>
                <Poster
                src= {imageUrl + movie.poster_path} alt={movie.title}/>

                <MovieInfo>
                    <TitleRating>
                        <h2>{movie.title}</h2>
                        <span style={{whiteSpace: 'nowrap'}}>평점: {movie.vote_average}</span>
                    </TitleRating>
                    <Genre>{movie.genre_ids.map(id => genreMap[id]).join(',')}</Genre>
                    <Overview>{movie.overview}</Overview>
                </MovieInfo>
            </div>
        </>
    )

}


export default DetailPage;