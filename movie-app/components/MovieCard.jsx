import {useNavigate} from 'react-router-dom';

export default function MovieCard({ movie }) {
    const navigate = useNavigate();
    const baseUrl = "https://image.tmdb.org/t/p/w500" 

    const handleClick = () => {
        navigate(`/details`);
    };

    return (
        <div
            className="max-w-[1000px] cursor-pointer transition-transform duration-300 hover:scale-105 border border-accent p-2 rounded shadow bg-dark text-dark2 flex flex-col h-[320px]"
            onClick={handleClick}
        >
            {/* 이미지 영역 (고정 높이 & 비율) */}
            <div className="w-full max-w-[200px] h-[250px] mx-auto overflow-hidden">
                <img
                    src={baseUrl + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            {/* 텍스트 영역 (하단 정렬) */}
            <div className="text-center">
                <h2 className="mt-2 font-semibold text-sm text-accent line-clamp-1">
                    {movie.title}
                </h2>
                <p className="text-xs text-gold">
                    ⭐ 평점: {movie.vote_average.toFixed(1)}
                </p>
            </div>
        </div>
    )
}