import { useEffect, useState } from "react";
import axios from "axios";
import { GiBackwardTime } from "react-icons/gi";
import { API_KEY } from "./Dashboard";
import VideoDetailsView from "./VideoDetailsView";

const VideoSkeleton = () => (
  <div className="flex gap-4 p-4 bg-white shadow rounded-2xl items-center animate-pulse">
    <div className="w-40 h-24 bg-gray-300 rounded-lg" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

const randomTime = () => {
  const minutes = Math.floor(Math.random() * 59) + 1;
  const seconds = Math.floor(Math.random() * 59) + 1;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              maxResults: 6,
              q: "technology OR programming OR music",
              type: "video",
            },
          }
        );

        const videoIds = res.data.items.map((v) => v.id.videoId).join(",");

        const detailsRes = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: API_KEY,
              part: "snippet,statistics,contentDetails",
              id: videoIds,
            },
          }
        );

        const formattedVideos = detailsRes.data.items.map((v) => ({
          id: v.id,
          title: v.snippet.title,
          url: `https://www.youtube.com/watch?v=${v.id}`,
          thumbnail: v.snippet.thumbnails.high.url,
          channel: {
            name: v.snippet.channelTitle,
            avatar: v.snippet.thumbnails.default?.url || "",
          },
          duration: v.contentDetails.duration || randomTime(),
        }));

        if (isMounted && formattedVideos.length > 0) {
          setVideos(formattedVideos);
          setLoading(false);
        } else if (isMounted) {
          setTimeout(fetchVideos, 2000);
        }
      } catch (error) {
        console.error("Error fetching Watch Later videos:", error);

        if (isMounted) setTimeout(fetchVideos, 2000);
      }
    };

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  if (selectedVideo) {
    return (
      <VideoDetailsView
        selectedVideo={selectedVideo}
        displayedVideos={videos}
        handleSelectVideo={handleSelectVideo}
        comments={[]}
        setComments={() => {}}
        newComment=""
        setNewComment={() => {}}
        handleAddComment={() => {}}
        handleScroll={() => {}}
      />
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <GiBackwardTime /> Watch Later
      </h1>

      <div className="space-y-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <VideoSkeleton key={i} />)
          : videos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleSelectVideo(video)}
                className="flex gap-4 p-4 bg-white shadow rounded-2xl items-center hover:bg-gray-50 transition cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="font-bold line-clamp-2">{video.title}</h2>
                  <p className="text-sm text-gray-500">
                    {video.duration} | {video.channel.name}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
