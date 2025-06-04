import { useState } from "react";
import ReactPlayer from "react-player";

const PlayVideo = ({ youtubeKey }) => {
  const [isAvailable, setIsAvailable] = useState(youtubeKey);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-30 overflow-hidden flex justify-center items-center">
      {!isAvailable && (
        <p className="text-2xl font-[my-font-Bd]">Video Not Available !</p>
      )}
      {isAvailable && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${youtubeKey}`}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          muted={true}
        />
      )}
    </div>
  );
};

export default PlayVideo;
