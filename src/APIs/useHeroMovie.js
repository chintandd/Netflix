import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHeroMovie } from "../../Redux/movieSlice";
import { OPTIONS } from "../utils/Constants";

const useHeroMovie = (heroMovieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getMovie(heroMovieId);
  }, []);

  async function getMovie(heroMovieId) {
    const youtubeID = await fetch(
      `https://tmdb-backend-1-dknt.onrender.com/api/tmdb/movie/${heroMovieId}/videos`,
      OPTIONS,
    );
    const details = await fetch(
      `https://tmdb-backend-1-dknt.onrender.com/api/tmdb/movie/${heroMovieId}`,
      OPTIONS,
    );

    const director = await fetch(
      `https://tmdb-backend-1-dknt.onrender.com/api/tmdb/movie/${heroMovieId}/credits`,
      OPTIONS,
    );

    const json = await youtubeID.json();
    const json2 = await details.json();
    const json3 = await director.json();
    const trailer = json.results.filter((m) => m.type == "Trailer")[1].key;
    const directorName = json3.crew.filter(
      (i) => i.known_for_department == "Directing",
    )[0].name;
    const year = json2.release_date.slice(0, 4);
    const genres = json2.genres.map((i) => i.name).splice(0, 3);
    const title = json2.title;
    const overview = json2.overview;

    dispatch(
      addHeroMovie({ trailer, genres, title, year, directorName, overview }),
    );
  }
};

export default useHeroMovie;
