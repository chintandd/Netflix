import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";
import { addRelatedMovies } from "../../Redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { genres } from "../utils/Constants";

const useRelatedMovies = () => {
  const dispatch = useDispatch();
  const genresString = useSelector(
    (store) => store.movie.watchScreenMovie?.genres || [],
  );
  const lang = useSelector(
    (store) => store.movie.watchScreenMovie?.lang || "",
  );


  useEffect(() => {
    if (genresString.length == 0) return;

    let genresID = genres.reduce((acc, curr) => {
      if (genresString.includes(curr.name)) {
        acc.push(curr.id);
      }
      return acc;
    }, []);

    fetchRelatedMovies(genresID);
    
  }, [genresString]);

  async function fetchRelatedMovies(genresID) {
    
    
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=1&with_genres=${genresID.join("%2C")}&with_original_language=${lang}`,
      OPTIONS,
    );
    const json = await data.json();
    const arr = [];

    json.results.map((movie) => {
      const movieId = movie.id;
      const genres = movie.genre_ids;
      const title = movie.title;
      const year = movie.release_date?.slice(0, 4);
      const poster = movie.backdrop_path;
      const popularity = movie.popularity;

      arr.push({
        movieId: movieId,
        title: title,
        genres: genres,
        year: year,
        poster: poster,
        popularity: popularity,
      });
    });
    dispatch(addRelatedMovies(arr));
  }
};

export default useRelatedMovies;
