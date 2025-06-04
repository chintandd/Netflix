import { useEffect } from "react"
import { OPTIONS } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addAllmovies } from "../../Redux/movieSlice";
import { useSelector } from "react-redux";

const useAllMovies = (pageNo) => {
  
    const dispatch = useDispatch()
     const isAvailable = useSelector((store)=>store.movie.allMovies[pageNo])
     const FilterMoviesQuery = useSelector((store)=>store.movie.FilterMoviesQuery)
     
    useEffect(()=>{
        if(!pageNo) return;
        if(isAvailable) return;
        const filterQuery = FilterMoviesQuery.reduce((acc,curr)=>{
            if(curr.string != null){
                acc[curr.query] = decodeURIComponent(curr.string)
            }
            return acc;
        },{})
        const controller = new AbortController()

        const final=new URLSearchParams(filterQuery).toString()
        fetchAllMovies(pageNo,final,controller.signal);


        return()=>{
            controller.abort()
        }
    },[pageNo,FilterMoviesQuery,isAvailable]);

    async function fetchAllMovies(page,final,signal){
       try {
              const data =  await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&${final}`,{...OPTIONS,signal})
            const json =  await data.json();
            console.log(json);
            
            const arr = []
            console.log(json);
            
            for (const movie of json.results) {
                if (movie.poster_path) {
                    arr.push({
                    movieId: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    popularity: movie.popularity,
                    genres: movie.genre_ids,
                    
                    });
                }
            }
            
            dispatch(addAllmovies({pageNo:page,movies:arr,totalPages:json.total_pages}))
       } catch (error) {
        
       } 
          
    }
}

export default useAllMovies
