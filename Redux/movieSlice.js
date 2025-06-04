import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    heroMovie: {
      trailer: null,
      genres: [],
      title: null,
      year: null,
      directorName: null,
      overview: null,
    },
    popularMovies: [],
    trendingMovies: [],
    upcomingMovies: [],
    categoryMovies: [],
    watchScreenMovie: null,
    relatedMovies: [],
    allMovies:{},
    FilterMoviesQuery:[],
    searchCacheResults:{},
    whishlistMovies:[],
    totalPage:null
  },
  reducers: {
    addHeroMovie: (state, action) => {
      const { trailer, genres, title, year, directorName, overview } =
        action.payload;
      state.heroMovie = {
        trailer,
        genres,
        title,
        year,
        directorName,
        overview,
      };
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addCategoryMovies: (state, action) => {
      state.categoryMovies = action.payload;
    },
    addoriginalsMovies: (state, action) => {
      state.originalsMovies = action.payload;
    },
    addWatchScreenMovie: (state, action) => {
      state.watchScreenMovie = action.payload;
    },
    clearWatchScreenMovie: (state) => {
      state.watchScreenMovie = null;
    },
    addRelatedMovies: (state, action) => {
      state.relatedMovies = action.payload;
    },
    addAllmovies:(state,action)=>{
      const {pageNo,movies,totalPages} = action.payload
      state.allMovies[pageNo] = movies
      state.totalPage = totalPages
    },
    setFilterQuery:(state,action)=>{
      state.FilterMoviesQuery = action.payload
    },
    clearAllMovies:(state)=>{
      state.allMovies = {}
    },
    setSearchCacheResults:(state,action)=>{
      const {cache,results} = action.payload
      state.searchCacheResults[cache] =results
    },
    addWhislistMovies:(state,action)=>{
      state.whishlistMovies = action.payload
    },
    toggleWhislistMovies:(state,action)=>{
      const {remove,movie} = action.payload
      if(remove){
       const data = state.whishlistMovies.filter(m=> m.movieId != movie)
       state.whishlistMovies = data
      }
      else{
        state.whishlistMovies.push(movie)
      }
    }
  },
});

export const {
  addHeroMovie,
  addPopularMovies,
  addTrendingMovies,
  addCategoryMovies,
  addUpcomingMovies,
  addWatchScreenMovie,
  clearWatchScreenMovie,
  addRelatedMovies,
  addAllmovies,
  setFilterQuery,
  clearAllMovies,
  setSearchCacheResults,
  addWhislistMovies,
  toggleWhislistMovies
} = movieSlice.actions;

export default movieSlice.reducer;
