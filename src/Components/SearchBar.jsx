// components/SearchBar.jsx
import { Search } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { OPTIONS } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCacheResults } from "../../Redux/movieSlice";
import {Link} from "react-router-dom"


const SearchBar = memo(({ searchExpand, setSearchExpand, searchBox, setSearchBox }) => {

    const [inputValue,setInputValue] = useState("")
    const [debouncedValue,setDebouncedValue] = useState("")
    const dispatch = useDispatch()
    const [searchList,setSearchList] = useState(null)
    const searchCacheResults = useSelector((store)=>store.movie.searchCacheResults)
    
    
  
    useEffect(()=>{

        
        let timer;
        timer = setTimeout(()=>{
            setDebouncedValue(inputValue)
        },300)

        return ()=>{
            clearTimeout(timer)
        }
    },[inputValue])

    
    useEffect(()=>{
        if(debouncedValue == ""){
          setSearchList(null)
          return
        }
        fetchSearchMovies(debouncedValue)
    },[debouncedValue])


    async function fetchSearchMovies(query){
        if(searchCacheResults[debouncedValue]){
            setSearchList(searchCacheResults[debouncedValue])
        }else{
          console.log("called");
          
            const data =  await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=1`,OPTIONS)
            const json = await data.json()
            console.log(json);
            if(json.results.length == 0){
              setSearchList([{noFound:"No result Found"}])
              return;
            }
            
            
            
    const storeResults = json.results.filter(f=> f.backdrop_path !== null).map(re=>({movieId:re.id,
            result:re.title,poster:re.backdrop_path}))
        
        dispatch(setSearchCacheResults({cache:debouncedValue,results:storeResults}))
        setSearchList(storeResults)
        }

  }


  return (
    <div className="search-bar h-[80%] md:h-full relative w-full flex items-center gap-1 md:gap-2 justify-between text-sm md:text-sm lg:text-lg">
      <input
        className={`h-full rounded-l-full rounded-r-full border-r-1 ${
          searchExpand
            ? "xl:w-[23rem] lg:w-[18rem] md:w-[20rem] sm:w-[20rem] w-[54vw] px-5 border-1"
            : "w-0"
        } ease duration-300 transition-all outline-none`}
        type="text"
        onFocus={() => setSearchBox(true)}
        onBlur={() => setSearchBox(false)}
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
      />
      <div onClick={() => setSearchExpand(!searchExpand)} className="cursor-pointer h-full flex items-center">
        <Search className="aspect-square h-[90%]" />
      </div>

     {searchList &&  <div
        className={`absolute max-h-[40vh] w-full bg-[#000000e6] top-[120%]
             ${
          searchBox ? "opacity-100" : "opacity-0 -z-1"
        } ease duration-200 flex flex-col py-4 text-sm font-[my-font-md] rounded-xl overflow-y-scroll scroll-hidden`}
      >
        
        {searchList.map((result) => (
         <>
          {result.noFound && <p key={result?.movieId} className="text-xs md:text-sm px-6 py-1.5"> {result?.noFound} </p> }
          <Link to={`/watch?v=${result.movieId}`} ><p key={result?.movieId} className="text-xs md:text-sm hover:bg-[#454444da] px-6 py-1.5 relative"> {result?.result} </p>
          </Link>
         </>
        ))}
      </div>}
    </div>
  );
});

export default SearchBar;
