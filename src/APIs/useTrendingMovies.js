import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../../Redux/movieSlice";

const useTrendingMovies = () => {
  const trendingMovies = useSelector((store) => store.movie.popularMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trendingMovies.length != 0) return;
    trendingMoviesFetch();
    console.log("trending movies");
  }, []);

  async function trendingMoviesFetch() {
    const data = await fetch(
      "https://tmdb-backend-1-dknt.onrender.com/api/tmdb/trending/movie/day",
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
            longPoster:longPoster,
            year:movie.release_date.slice(0,4),
            popularity: movie.popularity,
            
          });
      }),
    );

    dispatch(addTrendingMovies(arr));
  }
};

export default useTrendingMovies;
