import { useEffect, useState } from "react";
import axios from "axios";
import VideoDetailsView from "./VideoDetailsView";
import { API_KEY } from "./Dashboard";

// Skeleton Loader
const VideoSkeleton = () => (
  <div className="bg-white shadow rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300" />
    <div className="p-4 space-y-2">
      <div className="h-5 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="flex items-center gap-2 mt-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  </div>
);

export const Playlists = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlaylistVideos = async () => {
      const savedIds = JSON.parse(localStorage.getItem("playlistVideos")) || [];
      if (savedIds.length === 0) {
        setVideos([]);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: API_KEY,
              part: "snippet,statistics,contentDetails",
              id: savedIds.join(","),
            },
          }
        );

        const formattedVideos = res.data.items.map((v) => ({
          id: v.id,
          title: v.snippet.title,
          url: `https://www.youtube.com/watch?v=${v.id}`,
          thumbnail: v.snippet.thumbnails.high.url,
          views: Number(v.statistics.viewCount).toLocaleString() + " views",
          likes: Number(v.statistics.likeCount).toLocaleString() + " likes",
          duration: v.contentDetails.duration,
          timeAgo: new Date(v.snippet.publishedAt).toDateString(),
          channel: {
            name: v.snippet.channelTitle,
            avatar: v.snippet.thumbnails.default?.url || "",
          },
        }));

        if (isMounted && formattedVideos.length > 0) {
          setVideos(formattedVideos);
          setLoading(false);
        } else if (isMounted) {
          setTimeout(fetchPlaylistVideos, 2000);
        }
      } catch (error) {
        console.error("Error fetching playlist videos:", error);

        if (isMounted) setTimeout(fetchPlaylistVideos, 2000);
      }
    };

    fetchPlaylistVideos();

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
      <h1 className="text-2xl font-bold mb-4">Playlists</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <VideoSkeleton key={i} />)
          : videos.length === 0
          ? null
          : videos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleSelectVideo(video)}
                className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h2 className="font-semibold text-lg line-clamp-2">
                    {video.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {video.views} • {video.timeAgo}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {video.channel.avatar && (
                      <img
                        src={video.channel.avatar}
                        alt={video.channel.name}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {video.channel.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
