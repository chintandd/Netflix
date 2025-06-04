import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {useId, useState, memo } from "react";
import LongExploreMovieCard from "./LongExploreMovieCard";

const LongExploreCards = memo(({ title, movies }) => {
  const [hover, setHover] = useState(null);
  const uniqueId = useId();

  function handleHover(img1) {
    setHover(img1);
  }

  function removeHover() {
    setHover(null);
  }

  if (movies.length == 0) {
    return (
      <div className="flex  flex-nowrap items-center  overflow-hidden gap-3 md:gap-6 h-[23rem] md:h-[26rem] lg:h-[30rem] xl:h-[36rem] w-full py-4 md:py-6 px-5 md:px-15">
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-[9/16] rounded-xl "></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-screen flex flex-col text-white">
        <div className="flex flex-col gap-3 md:gap-6  w-full h-[23rem] md:h-[26rem] lg:h-[30rem] xl:h-[36rem]">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-[my-font-bd] px-5 md:px-15">
            {title}
          </h2>
          <div className="card-container  w-full  flex-1 min-h-0 px-5 lg:px-15  relative ">
            <div
              className={`prev-${uniqueId} absolute top-1/2 left-0 transform h-full w-20  z-3  -translate-y-1/2 rounded-2xl cursor-pointer py-2 flex justify-start items-center`}
            >
              <ChevronLeft className="w-7 h-7  md:w-10 md:h-10 lg:w-13 lg:h-13" />
            </div>
            {!hover && (
              <div
                className={` absolute top-1/2 left-0 transform h-[110%] w-20 bg-gradient-to-r from-black to-transparent z-2  -translate-y-1/2 pointer-events-none py-2 flex justify-start items-center`}
              ></div>
            )}
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView="auto"
              slidesPerGroup={1}
              speed={500}
              navigation={{
                nextEl: `.next-${uniqueId}`,
                prevEl: `.prev-${uniqueId}`,
              }}
              className="swiper-container h-full "
            >
              {movies.map((i) => {
                return (
                  <SwiperSlide
                    key={i.movieId}
                    className={`swiper-slide h-full aspect-[9/16] ${hover == i.movieId && "z-1"}`}
                  >
                    <LongExploreMovieCard
                      data={i}
                      isHovered={hover == i.movieId}
                      handleHover={handleHover}
                      removeHover={removeHover}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div
              className={`next-${uniqueId} absolute top-1/2 right-3 transform h-full w-20 -translate-y-1/2 rounded-2xl z-3 cursor-pointer py-2 flex justify-end items-center`}
            >
              <ChevronRight className="w-7 h-7  md:w-10 md:h-10 lg:w-13 lg:h-13" />
            </div>
            {!hover && (
              <div
                className={` absolute top-1/2 right-0 transform h-[110%] w-20 bg-gradient-to-l from-black to-transparent z-2  -translate-y-1/2 pointer-events-none py-2 flex justify-start items-center`}
              ></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default LongExploreCards;
