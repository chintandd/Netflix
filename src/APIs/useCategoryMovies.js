import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addCategoryMovies } from "../../Redux/movieSlice";
import { useSelector } from "react-redux";

const useCategoryMovies = () => {
  const categoryMovies = useSelector((store) => store.movie.popularMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryMovies.length != 0) return;
    categoryMoviesFetch();
    console.log("cetegory");
  }, []);

  async function categoryMoviesFetch() {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_genres=878",
      OPTIONS,
    );
    const json = await data.json();

   
    const arr = [];

    await Promise.all(
      json.results.map(async (movie) => {
        const images = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images`,
          OPTIONS,
        );
        const json2 = await images.json();
        const poster = json2.posters.filter(
          (i) => i.iso_639_1 === "en" && i.file_path,
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
            poster:movie.backdrop_path,
            popularity:movie.popularity,
            year:movie.release_date.slice(0,4)
          });
      }),
    );

    dispatch(addCategoryMovies(arr));
  }
};

export default useCategoryMovies;
