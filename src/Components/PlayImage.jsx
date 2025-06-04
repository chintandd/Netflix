const PlayImage = ({ poster }) => {
  return (
    <div className="absolute h-full w-full scale-110 top-0 -z-10 object-cover object-center ">
      <picture>

        <source media="(max-width:640px)" srcSet={`https://image.tmdb.org/t/p/w780/${poster}`}/>
        <source media="(max-width:1280px)" srcSet={`https://image.tmdb.org/t/p/w1280/${poster}`}/>
        <source media="(min-width:1280px)" srcSet={`https://image.tmdb.org/t/p/original/${poster}`}/>

        <img
        src={`https://image.tmdb.org/t/p/w780/${poster}`}  
        className="h-[94%] md:h-full w-full object-cover object-top-left overflow-hidden"
        alt=""
      />

      </picture>
      <div className=" h-full w-full absolute  bottom-0 bg-gradient-to-t from-black via-black/70  to-transparent"></div>
    </div>
  );
};

export default PlayImage;
