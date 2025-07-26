import React from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import movieListData from "./data/movieListData.json";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>영화 리스트</h1>
        <div className="movie-list">
          {movieListData.results?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id} // 추가!!
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default App;

//
//
// App.jsx

// import React from "react";
// import MovieDetail from "./components/MovieDetail";

// function App() {
//   return (
//     <div className="app">
//       <MovieDetail />
//     </div>
//   );
// }

// export default App;
