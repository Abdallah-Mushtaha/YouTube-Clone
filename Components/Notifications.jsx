import { useEffect, useState } from "react";
import axios from "axios";
import { BsBell } from "react-icons/bs";
import { API_KEY } from "./Dashboard";
import VideoDetailsView from "./VideoDetailsView";

const randomTimeAgo = () => {
  const hours = Math.floor(Math.random() * 48) + 1;
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

const NotificationSkeleton = () => (
  <div className="p-4 rounded-2xl shadow bg-white flex items-start gap-3 animate-pulse">
    <div className="w-10 h-10 bg-gray-300 rounded-full" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRandomVideos = async () => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              maxResults: 8,
              q: "programming OR tech OR music",
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

        const formattedNotifications = detailsRes.data.items.map((v) => ({
          id: v.id,
          title: v.snippet.title,
          url: `https://www.youtube.com/watch?v=${v.id}`,
          thumbnail: v.snippet.thumbnails.high.url,
          channel: {
            name: v.snippet.channelTitle,
            avatar: v.snippet.thumbnails.default?.url || "",
          },
          timeAgo: randomTimeAgo(),
          views: Number(v.statistics.viewCount).toLocaleString() + " views",
        }));

        if (isMounted && formattedNotifications.length > 0) {
          setNotifications(formattedNotifications);
          setLoading(false);
        } else if (isMounted) {
          setTimeout(fetchRandomVideos, 2000);
        }
      } catch (error) {
        if (isMounted) setTimeout(fetchRandomVideos, 2000);
      }
    };

    fetchRandomVideos();

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
        displayedVideos={notifications}
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
        <BsBell /> Notifications
      </h1>

      <div className="space-y-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <NotificationSkeleton key={i} />)
          : notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleSelectVideo(notif)}
                className="p-4 rounded-2xl shadow bg-white flex items-start gap-3 hover:bg-gray-50 transition cursor-pointer"
              >
                <img
                  src={notif.channel.avatar}
                  alt={notif.channel.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gray-700">
                    <strong>{notif.channel.name}</strong> uploaded:{" "}
                    {notif.title}
                  </p>
                  <span className="text-sm text-gray-500">{notif.timeAgo}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
