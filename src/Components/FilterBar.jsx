import { useState,memo} from "react";
import { genres } from "../utils/Constants";
import { languages } from "../utils/Constants";
import { years } from "../utils/Constants";
import { sorting,languagesSorting } from "../utils/Constants";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Funnel } from "lucide-react";
import { Sparkles } from "lucide-react";
import { clearAllMovies, setFilterQuery } from "../../Redux/movieSlice";
import { useDispatch } from "react-redux";


const FilterBar = memo(() => {
  const [langExpand, setLangExpand] = useState(true);
  const [yearExpand, setYearExpand] = useState(true);
  const [sortExpand, setSortExpand] = useState(true);
  const [filterExpand, setFilterExpand] = useState(false);
  const [genresChecked,setGenresChecked] = useState([])
  const [language,setLanguage] = useState("Languages")
  const [year,setYear] = useState("Year")
  const [sort,setSort] = useState("Sort By")

  const dispatch = useDispatch()

  console.log("filter");  

  // final strings to store
  let genresString = null
  let langString = null
  let yearString = null
  let sortString = null

   
  function submitFilter(){
      if(genresChecked.length != 0){
       const genresIdArray = genres.reduce((acc,curr)=>{
              if(genresChecked.includes(curr.name)){
                acc.push(curr.id)
              }
              return acc;
        },[])
        
        console.log(genresIdArray);
        
        genresString = genresIdArray.join('%2C')
      }
      if(language != "Languages"){
          langString = languagesSorting[language]
      }
      if(year != "Year"){
          yearString = year
      }
      if(sort != "Sort By"){
          sortString = sorting[sort]
      }
  
      
      dispatch(setFilterQuery)
      setFilterExpand(false)
      resetAll()
      
      const finalArr = [
  { query: "with_original_language", string: langString },
  { query: "sort_by", string: sortString },
  { query: "year", string: yearString },
  { query: "with_genres", string: genresString }
]

      dispatch(setFilterQuery(finalArr))
      dispatch(clearAllMovies())
    
  }

  function resetAll(){
    setYear("Year")
    setSort("Sort By")
    setLanguage("Languages")
    setYearExpand(true)
    setLangExpand(true)
    setSortExpand(true)
    setGenresChecked([])
  }


  // Handle genres checkboxes also we get Checked genres values

  function handleGenres(genre){
      const filter = genresChecked.filter((g)=> g != genre)
      if(genresChecked.includes(genre)){
        setGenresChecked(filter)
      }else{
        setGenresChecked([...filter,genre])
      }
  }

  // Handle languages 

    function handleLang(lang){
    setLanguage(lang)
    setLangExpand(false)
  }


  
  // Handle year

  function handleYear(year){
     setYear(year)
     setYearExpand(false)
  }

  // Handle Sort By

  function handleSort(sort){
    setSort(sort)
    setSortExpand(false)
  }

   function handleLangExpand() {
    setLangExpand(!langExpand);
  }

  function handleYearExpand() {
    setYearExpand(!yearExpand);
  }

  function handleSortExpand() {
    setSortExpand(!sortExpand);
  }

  function handleFilterExpand() {
    setFilterExpand(!filterExpand);
  }

  return (

      <div className={`w-[95vw] md:w-[90vw] lg:w-[74vw] xl:w-[70vw] 2xl:w-[60vw] h-15 relative z-20 text-white mt-4 mb-2`}>
        <div onClick={handleFilterExpand} className="h-full w-full bg-[#1B1B1B] px-5 py-2 flex justify-between items-center  rounded-xl cursor-pointer ">
          <div  className="flex h-full items-center gap-2">
            <p className="text-sm sm:text-base font-[my-font-Md]">
              Filter Movies
            </p>
            <Funnel className="h-[40%] aspect-square" />
          </div>
          <div className="cursor-pointer" >
            {filterExpand ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
        <div
          className={`h-15 sm:h-15 md:h-15 lg:h-15 flex-col gap-5 lg:gap-0 lg:flex-row absolute w-full bg-[#161616]    transition-all -z-10  ease duration-250 -translate-y-14 opacity-100 ${filterExpand && "translate-y-2 opacity-100 lg:h-[50vh] h-[70vh] sm:h-[65vh] md:h-[60vh]"} flex md:px-6 lg:px-8 xl:px-15 py-4 rounded-xl`}
        >
          <div className={`flex w-full h-[50%] sm:h-[60%] lg:h-[80%] gap-2 sm:gap-4 px-2 sm:px-4 lg:px-0 lg:gap-0 lg:justify-between opacity-0 ${filterExpand && 'opacity-100'}`}>
            <div className=" lg:h-full  flex flex-col lg:px-3 gap-2 lg:gap-4 flex-1 ">
              <div
                onClick={handleLangExpand}
                className="relative z-10 px-3 py-1 w-full border-1 border-[#3D3C3A] rounded-md cursor-pointer flex justify-between items-center bg-[#1B1B1B]"
              >
                <p className="text-[0.75rem] sm:text-[0.9rem] md:text-md font-[my-font-Md]">
                 {language}
                </p>
                {langExpand ? (
                  <ChevronDown className="aspect-square h-3/4" />
                ) : (
                  <ChevronUp className="aspect-square h-3/4" />
                )}
              </div>
              <div
                className={`max-h-full overflow-y-scroll scroll-hidden w-full  border-1 border-[#3D3C3A] opacity-0 ease duration-150 cursor-pointer -z-1 -translate-y-15 rounded-md ${langExpand && "opacity-100 max-h-full z-1 translate-y-0"}`}
              >
                {languages.map((lang, index) => {
                  return (
                    <p
                      onClick={()=>handleLang(lang.name)}
                      key={lang.iso_639_1}
                      className={`text-xs sm:text-sm text-center py-1.5 lg:px-15  hover:bg-[#454444da] ease duration-200 ${index != languages.length - 1 && "border-b-1"} border-[#454444] cursor-pointer `}
                    >
                      {lang.name}
                    </p>
                  );
                })}
              </div>
            </div>
            
            <div className=" lg:h-full  flex flex-col lg:px-3 gap-2 lg:gap-4 flex-1 ">
              <div
                onClick={handleYearExpand}
                className="relative z-10 px-3 py-1 w-full border-1 border-[#3D3C3A] rounded-md cursor-pointer flex justify-between items-center bg-[#1B1B1B]"
              >
                <p className="text-[0.75rem] sm:text-[0.9rem] md:text-md font-[my-font-Md]">
                  {year}
                </p>
                {yearExpand ? (
                  <ChevronDown className="aspect-square h-3/4" />
                ) : (
                  <ChevronUp className="aspect-square h-3/4" />
                )}
              </div>
              <div
                className={`max-h-full overflow-y-scroll scroll-hidden w-full  border-1 border-[#3D3C3A] opacity-0 ease duration-150 cursor-pointer -z-1 -translate-y-15 rounded-md ${yearExpand && "opacity-100 max-h-full lg:max-h-full z-1 translate-y-0"}`}
              >
                {years.map((y, index) => {
                  return (
                    <p
                      onClick={()=>handleYear(y)}
                      key={y}
                      className={`text-xs sm:text-sm text-center py-1.5 lg:px-15  hover:bg-[#454444da] ease duration-200 ${index != years.length - 1 && "border-b-1"} border-[#454444] cursor-pointer `}
                    >
                      {y}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="lg:h-full   flex flex-col   lg:px-3 gap-2 lg:gap-4 flex-1">
              <div
                onClick={handleSortExpand}
                className="relative z-10 px-3 py-1 w-full border-1 border-[#3D3C3A] rounded-md cursor-pointer flex justify-between items-center bg-[#1B1B1B]"
              >
                <p className="text-[0.75rem] sm:text-[0.9rem] md:text-md font-[my-font-Md]">
                 {sort}
                </p>
                {sortExpand ? (
                  <ChevronDown className="aspect-square h-3/4" />
                ) : (
                  <ChevronUp className="aspect-square h-3/4" />
                )}
              </div>
              <div
                className={`max-h-full overflow-y-scroll scroll-hidden w-full  border-1 border-[#3D3C3A] opacity-0 ease duration-150 cursor-pointer -z-1 -translate-y-15  rounded-md  ${sortExpand && "opacity-100 max-h-full z-1 translate-y-0"}`}
              >
                <p onClick={()=>handleSort("Popularity")} className=" text-xs sm:text-sm text-center py-1.5 px-2 md:px-3 lg:px-6 hover:bg-[#454444da] ease duration-200 border-b-1 border-[#454444]">
                  Popularity
                </p>
                <p onClick={()=>handleSort("Rating (High to Low)")} className=" text-xs sm:text-sm text-center py-1.5 px-2 md:px-3 lg:px-6 hover:bg-[#454444da] ease duration-200 border-b-1 border-[#454444]">
                  Rating (High to Low)
                </p>
                <p onClick={()=>handleSort("Rating (Low to High)")} className=" text-xs sm:text-sm text-center py-1.5 px-2 md:px-3 lg:px-6 hover:bg-[#454444da] ease duration-200 border-b-1 border-[#454444]">
                  Rating (Low to High)
                </p>
                <p onClick={()=>handleSort("Name (A-Z)")} className="text-xs sm:text-sm text-center py-1.5 px-2 md:px-3 lg:px-6 hover:bg-[#454444da] ease duration-200 border-b-1 border-[#454444]">
                  Name (A-Z)
                </p>
                <p onClick={()=>handleSort("Name (Z-A)")} className="text-xs sm:text-sm text-center py-1.5 px-2 md:px-3 lg:px-6  hover:bg-[#454444da] ease duration-200 border-b-0 border-[#454444]">
                  Name (Z-A)
                </p>
              </div>
            </div>
          </div>
          <div className={`flex h-[40%] lg:h-[80%] justify-start lg:justify-end w-full  lg:w-[25%]  opacity-0 ${filterExpand && 'opacity-100'}`}>
            <div className="h-full px-3 flex flex-col items-start gap-2 lg:gap-4">
              <p className=" py-1 text-[0.8rem] sm:text-[0.9rem] lg:w-auto md:text-md font-[my-font-Md]">
                Genres
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:flex lg:flex-col gap-2 gap-x-3 lg:gap-y-2  lg:overflow-y-scroll scroll-hidden w-full lg:w-auto">
                {genres.map((genre) => {
                  return (
                    <div
                      key={genre.id}
                      className="flex items-center gap-3 sm:whitespace-nowrap"
                    >
                      <input
                        onChange={()=>handleGenres(genre.name)}
                        checked={genresChecked.includes(genre.name)}
                        type="checkbox"
                        id={genre.name}
                        className="h-3 md:h-4 aspect-square accent-[#D9232E] cursor-pointer "
                      />
                      <label
                        className="cursor-pointer text-xs lg:text-sm xl:text-base"
                        htmlFor={genre.name}
                      >
                        {genre.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="h-full px-3 flex flex-col items-start gap-2 lg:gap-4">
              <p className="lg:py-1  text-[0.8rem] sm:text-[0.9rem] lg:w-auto md:text-md font-[my-font-Md]">
                Languages
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col gap-1.5 lg:gap-y-2  lg:overflow-y-scroll scroll-hidden w-full lg:w-auto ">
                {languages.map((l) => {
                  return (
                    <div key={l.iso_639_1} className="flex items-center gap-3 ">
                      <input
                        onChange={()=>handleLang(l.name)}
                        checked={langChecked.includes(l.name)}
                        type="checkbox"
                        id={l.name}
                        className="h-3 md:h-4 aspect-square accent-[#D9232E] cursor-pointer "
                      />
                      <label
                        className="cursor-pointer text-xs sm:text-sm lg:text-base"
                        htmlFor={l.name}
                      >
                        {l.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>
          

          <div onClick={submitFilter} className={`h-7 md:h-8 mt-2 w-fit px-5 absolute  left-1/2 bottom-4 -translate-x-1/2  right-3 bg-[#D9232E] rounded-xl flex items-center justify-center gap-1 md:gap-2 cursor-pointer opacity-100`}>
            <button className="text-[0.8rem]  md:text-sm lg:text-md font-[my-font-Md] h-full cursor-pointer">
              Filter
            </button>
            <Sparkles className="h-[55%] aspect-square" />
          </div>
        </div>
      </div>

  );
});

export default FilterBar;
