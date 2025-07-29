const accessToken =
import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function fetchPopularMovies() {
    
    const res = await
    fetch('https://api.themoviedb.org/3/movie/popular',{
        method: 'GET',
        
        headers: {accept: 'application/json', 
        Authorization: `Bearer ${accessToken}`}
    });

    if (!res.ok) {
        throw new Error('API 요청 실패')
    }
    const data = await res.json();
    return data.results.filter(movie =>
        movie.adult === false);
}