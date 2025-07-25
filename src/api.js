const TOKEN = import.meta.env.VITE_MOVIE_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getMovies() {
  const url = `${BASE_URL}/movie/popular?${TOKEN}&language=ko-KR&page=1`;

  const response = await fetch(url, options);
  const data = await response.json();
  const filtered = data.results.filter((movie) => movie.adult === false);

  return filtered;
}

export async function getMovieDetail(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${TOKEN}&language=ko-KR`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
