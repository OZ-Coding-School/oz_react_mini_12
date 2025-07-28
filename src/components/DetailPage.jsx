import styled from 'styled-components';
import data from '../assets/data/movieDetailData.json';
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

function DetailPage () {
    const { id } = useParams();
    const movie = data;
    
    if(Number(id) !== movie.id) {
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
                        <span>평점: {movie.vote_average}</span>
                    </TitleRating>
                    <Genre>{movie.genres.map(genre => genre.name).join(',')}</Genre>
                    <Overview>{movie.overview}</Overview>
                </MovieInfo>
            </div>
        </>
    )

}


export default DetailPage;