import video from "/assets/video3.webm";
const HeroVideo = () => {
  return (
    <>
      <div className="video-div h-[70vh] lg:h-screen w-full -z-10 object-cover object-center overflow-hidden absolute top-0">
        <video
          src={video}
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
          className="scale-110 h-full w-full object-cover object-center"
        ></video>
      </div>
      <div className="absolute inset-0 bg-black/40 z-[-10]" />
      <div className="absolute top-0 w-full h-[72vh] lg:h-screen bg-gradient-to-b from-transparent via-black/40 to-black z-[-9] pointer-events-none" />
    </>
  );
};

export default HeroVideo;
