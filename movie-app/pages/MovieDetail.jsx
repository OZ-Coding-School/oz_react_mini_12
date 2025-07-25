import data from "../data/movieDetailData.json"

export default function MovieDetail() {
    const baseUrl = "https://image.tmdb.org/t/p/w500" 

    return (
        <div className="grid grid-rows-[auto_1fr] gap-6 max-w-3xl mx-auto p-6 text-white bg-darkest rounded-md shadow">
            <div>
                <img
                src={baseUrl + data.backdrop_path}
                alt={data.title}
                className="w-full rounded-lg shadow-md"
                />
            </div>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-accent">{data.title}</h1>
                <p className="text-gray-300">{data.overview}</p>
                <p className="text-gold font-medium">
                ⭐ 평점: {data.vote_average.toFixed(1)}
                </p>
                <div className="text-sm text-gray-400">
                장르:
                {data.genres.map((genre) => (
                    <span key={genre.id} className="font-semibold text-accent">
                    {" "}
                    {genre.name}
                    </span>
                ))}
                </div>
                <button className="px-4 py-2 bg-primary text-darker font-semibold rounded hover:bg-accent hover:text-darkest transition">
                ▶ 지금 시청
                </button>
            </div>
        </div>
);
}