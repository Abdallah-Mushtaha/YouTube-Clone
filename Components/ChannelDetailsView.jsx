import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "./Dashboard";
import VideoCard from "./VideoCard";

const VideoSkeleton = () => (
  <div className="h-48 bg-gray-300 animate-pulse rounded-lg w-full" />
);

const ChannelDetailsView = ({ selectedChannel, handleBack }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              channelId: selectedChannel.id,
              maxResults: 12,
              order: "date",
              type: "video",
            },
          }
        );

        if (isMounted) {
          const fetchedVideos = res.data.items.map((v) => ({
            id: v.id.videoId,
            title: v.snippet.title,
            thumbnail: v.snippet.thumbnails.high.url,
            url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
            channel: {
              name: selectedChannel.name,
              avatar: selectedChannel.avatar,
            },
            timeAgo: new Date(v.snippet.publishedAt).toDateString(),
            views: "N/A",
          }));

          setVideos(fetchedVideos);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching channel videos:", error);
        // لا نضع setLoading(false)، يبقى skeleton شغال
        // ويمكن إعادة المحاولة بعد فترة قصيرة
        setTimeout(fetchChannelVideos, 3000); // إعادة المحاولة كل 3 ثواني
      }
    };

    fetchChannelVideos();

    return () => {
      isMounted = false;
    };
  }, [selectedChannel]);

  return (
    <div className="p-6">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-2 mb-6 text-gray-600 font-semibold rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={selectedChannel.avatar}
          alt={selectedChannel.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{selectedChannel.name}</h1>
          {selectedChannel.subscribers && (
            <p className="text-sm text-gray-500">
              {selectedChannel.subscribers}
            </p>
          )}
          {selectedChannel.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {selectedChannel.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <VideoSkeleton key={i} />)
          : videos.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={() => {}} />
            ))}
      </div>
    </div>
  );
};

export default ChannelDetailsView;
