const VideoPlayer = ({ url }) => {
  if (!url) return null;

  const embedUrl = `${url.replace(
    "watch?v=",
    "embed/"
  )}?autoplay=1&controls=1&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        key={embedUrl}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
