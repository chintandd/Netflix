import ExploreCards from "./ExploreCards/ExploreCards";
import LongExploreCards from "./LongExploreCards/LongExploreCards";
import NanoExploreCards from "./NanoExploreCards/NanoExploreCards";

const AllCards = ({
  popularMovies,
  upcomingMovies,
  trendingMovies,
  categoryMovies,
}) => {
  return (
    <div className="min-h-screen max-w-screen flex flex-col mt-15 gap-14 relative">
      <ExploreCards title={"Popular on Netflix"} movies={popularMovies} />
      <NanoExploreCards title={"Upcoming Movies"} movies={upcomingMovies} />
      <ExploreCards title={"Trending Now"} movies={trendingMovies} />
      <LongExploreCards title={"Sci-fi Movies"} movies={categoryMovies} />
      {/* <TextExploreCards title={"Top 10 in Canada"}/> */}
    </div>
  );
};

export default AllCards;
