import detailData from '../../data/movieDetailData.json'
import '../styles/MovieDetail.css'

export default function MovieDetail() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return (
        <>
            <div className='movieDetail'>
                <div className='detailPoster'>
                    <img src={`${baseUrl}${detailData.belongs_to_collection.poster_path}`} />
                </div>
                <div className='detailContent'>
                    <div className='detailTitleRating'>
                        <div className='detailTitle'>
                            <h3>{detailData.title}</h3>
                        </div>
                        <div className='detailRate'>
                            <h3>{detailData.vote_average}</h3>
                        </div>
                    </div>
                    <div className='detailGenres'>
                        {detailData.genres.map((el) => <span key={el.id}>&nbsp; {el.name} &nbsp;</span>)}
                    </div>
                    <div className='detailOverview'>
                        <p>{detailData.overview}</p>
                    </div>
                </div>
            </div>
        </>
    )
}