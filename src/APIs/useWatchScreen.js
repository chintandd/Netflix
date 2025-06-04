import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addWatchScreenMovie } from "../../Redux/movieSlice";

const useWatchScreen = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    watchData(movieId);
  }, [movieId]);

  async function watchData(movieId) {
    console.log("watch called");
    
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      OPTIONS,
    );
    const json = await data.json();
    const youtubeKey = await youtubeId(movieId);
    const logoImage = await logo(movieId);
    const genres = json.genres.map((g) => g.name);
    const title = json.title;
    const overview = json.overview;
    const poster = json.backdrop_path;
    const popularity = json.popularity;
    const release_date = json.release_date;
    dispatch(
      addWatchScreenMovie({
        youtubeKey: youtubeKey,
        movieId:movieId,
        title: title,
        genres: genres,
        overview: overview,
        poster: poster,
        popularity: popularity,
        release_date: release_date,
        logo: logoImage,
        year:release_date.slice(0,4)
      }),
    );
  }

  async function youtubeId(movieId) {
    const youtubeID = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      OPTIONS,
    );

    const json2 = await youtubeID.json();

    const key = json2.results.filter(
      (m) => m.type == "Trailer",
    )[0]?.key;
    return key;
  }

  async function logo(movieId) {
    const images = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      OPTIONS,
    );
    const json3 = await images.json();

    const logo = json3.logos.filter(
      (i) => i.iso_639_1 === "en" && i.file_path,
    )[0]?.file_path;
    return logo;
  }
};

export default useWatchScreen;
