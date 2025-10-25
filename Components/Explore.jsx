import { useEffect, useState } from "react";
import axios from "axios";
import { FiCompass } from "react-icons/fi";
import VideoDetailsView from "./VideoDetailsView";
import { API_KEY } from "./Dashboard";

const VideoSkeleton = () => (
  <div className="bg-white shadow rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-32 bg-gray-300" />
    <div className="p-2 space-y-1">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

const keywords = {
  Gaming: ["gaming", "letsplay", "fortnite", "minecraft"],
  Music: ["music", "live", "cover", "remix"],
  Technology: ["tech", "gadgets", "AI", "programming"],
  Education: ["education", "learning", "tutorial", "study"],
};

const Explore = () => {
  const [videos, setVideos] = useState({});
  const [loadingCategories, setLoadingCategories] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const isMounted = { current: true };

    const fetchCategoryVideos = async (category) => {
      setLoadingCategories((prev) => ({ ...prev, [category]: true }));
      try {
        const randomKeyword =
          keywords[category][
            Math.floor(Math.random() * keywords[category].length)
          ];

        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              q: randomKeyword,
              maxResults: 4,
              type: "video",
            },
          }
        );

        const ids = res.data.items.map((v) => v.id.videoId).join(",");
        const detailsRes = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: API_KEY,
              part: "snippet,statistics,contentDetails",
              id: ids,
            },
          }
        );

        const categoryVideos = detailsRes.data.items.map((v) => ({
          id: v.id,
          title: v.snippet.title,
          url: `https://www.youtube.com/watch?v=${v.id}`,
          thumbnail: v.snippet.thumbnails.high.url,
          channel: {
            name: v.snippet.channelTitle,
            avatar: v.snippet.thumbnails.default?.url || "",
          },
          views: Number(v.statistics.viewCount).toLocaleString() + " views",
        }));

        if (isMounted.current && categoryVideos.length > 0) {
          setVideos((prev) => ({ ...prev, [category]: categoryVideos }));
          setLoadingCategories((prev) => ({ ...prev, [category]: false }));
        } else if (isMounted.current) {
          setTimeout(() => fetchCategoryVideos(category), 2000);
        }
      } catch (error) {
        if (isMounted.current)
          setTimeout(() => fetchCategoryVideos(category), 2000);
      }
    };

    Object.keys(keywords).forEach((cat) => fetchCategoryVideos(cat));

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  if (selectedVideo) {
    return (
      <VideoDetailsView
        selectedVideo={selectedVideo}
        displayedVideos={Object.values(videos).flat()}
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
    <div className="p-6 space-y-6">
      <header className="flex items-center gap-3">
        <FiCompass size={24} />
        <h1 className="text-2xl font-bold">Explore</h1>
      </header>

      {Object.keys(keywords).map((cat) => (
        <section key={cat} className="space-y-3">
          <h2 className="font-semibold text-lg">{cat}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loadingCategories[cat]
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <VideoSkeleton key={i} />)
              : videos[cat]?.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg cursor-pointer transition"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="text-sm font-bold line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {video.channel.name} • {video.views}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Explore;
