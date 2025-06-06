import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../../Redux/movieSlice";

const usePopularMovies = () => {
  const popularMovies = useSelector((store) => store.movie.popularMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popularMovies.length != 0) return;
    popularMoviesFetch();
    
  }, []);

  async function popularMoviesFetch() {
    const data = await fetch(
      "https://tmdb-backend-1-dknt.onrender.com/api/tmdb/movie/popular?page=1",
      OPTIONS,
    );
    const json = await data.json();
    const arr = [];
    
    

    await Promise.all(
      json.results.map(async (movie) => {
        const images = await fetch(
          `https://tmdb-backend-1-dknt.onrender.com/api/tmdb/movie/${movie.id}/images`,
          OPTIONS,
        );
        const json2 = await images.json();
        const poster = json2.backdrops.filter(
          (i) => i.iso_639_1 === "en" && i.file_path,
        )[0]?.file_path;
        const longPoster = movie.poster_path
        
        const posterNoText = json2.backdrops.filter(
          (i) => i.iso_639_1 === null && i.file_path,
        )[0]?.file_path;
        const logo = json2.logos.filter(
          (i) => i.iso_639_1 === "en" && i.file_path,
        )[0]?.file_path;
        poster &&
          logo &&
          arr.push({
            movieId: movie.id,
            posterImage: poster,
            title: movie.title,
            genres: movie.genre_ids,
            logoImage: logo,
            posterNoText: posterNoText,
            popularity: movie.popularity,
            longPoster:longPoster,
            year:movie.release_date.slice(0,4)
          });
      }),
    );

    dispatch(addPopularMovies(arr));
  }
};

export default usePopularMovies;
