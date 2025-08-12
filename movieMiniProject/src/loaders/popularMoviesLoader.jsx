export async function popularMoviesLoader() {
  const { VITE_API_TOKEN } = import.meta.env;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${VITE_API_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
    options
  );

  if (!res.ok) {
    throw new Response(`서버 오류!`, { status: res.status });
  }
  const data = await res.json();
  return data;
}
