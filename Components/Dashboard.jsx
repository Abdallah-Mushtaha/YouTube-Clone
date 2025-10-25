import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectVideo } from "../src/videoSlice.jsx";
import VideoDetailsView from "./VideoDetailsView.jsx";

const VideoSkeleton = () => (
  <div className="animate-pulse">
    <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
  </div>
);

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const VideoCard = ({ video, onSelect }) => (
  <div className="cursor-pointer w-full" onClick={() => onSelect(video)}>
    <img
      src={video.thumbnail}
      alt={video.title}
      className="w-full h-48 object-cover rounded-lg"
    />
    <div className="flex mt-2">
      <img
        src={video.channel.avatar || "/images/user.png"}
        alt={video.channel.name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2" title={video.title}>
          {video.title}
        </h3>
        <p className="text-xs text-gray-500">
          {video.channel.name} • {video.views} • {video.timeAgo}
        </p>
      </div>
    </div>
  </div>
);

export const API_KEY = "AIzaSyAy_NeLz-taxr1QPbZxemnTzDSH3u9WM1w";

export default function DashboardWithDetails() {
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.video.selectedVideo);
  const searchResults = useSelector((state) => state.video.searchResults);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedVideoIds, setLoadedVideoIds] = useState(new Set());

  const fetchVideos = async (pageToken = "") => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            part: "snippet",
            maxResults: 12,
            q: "programming",
            type: "video",
            pageToken,
          },
        }
      );

      setNextPageToken(res.data.nextPageToken || null);

      const videoIds = res.data.items
        .map((v) => v.id.videoId)
        .filter((id) => !loadedVideoIds.has(id));

      if (videoIds.length === 0) return;

      const videoDetailsRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            key: API_KEY,
            part: "statistics,contentDetails",
            id: videoIds.join(","),
          },
        }
      );

      const fetchedVideos = res.data.items
        .filter((v) => !loadedVideoIds.has(v.id.videoId))
        .map((v, index) => {
          const details = videoDetailsRes.data.items[index];
          return {
            id: v.id.videoId,
            title: v.snippet.title,
            url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
            thumbnail: v.snippet.thumbnails.high.url,
            views: details.statistics.viewCount + " views",
            likes: details.statistics.likeCount + " likes",
            duration: details.contentDetails.duration,
            timeAgo: new Date(v.snippet.publishedAt).toDateString(),
            channel: {
              id: v.snippet.channelId,
              name: v.snippet.channelTitle,
              avatar: v.snippet.thumbnails?.default?.url || "",
              isVerified: false,
            },
            description: v.snippet.description,
          };
        });

      setLoadedVideoIds((prev) => {
        const newSet = new Set(prev);
        fetchedVideos.forEach((v) => newSet.add(v.id));
        return newSet;
      });

      setVideos((prev) => shuffleArray([...prev, ...fetchedVideos]));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const loadMoreVideos = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      fetchVideos(nextPageToken || "").finally(() => setLoadingMore(false));
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreVideos();
    }
  };

  const handleSelectVideo = async (video) => {
    dispatch(selectVideo(video));

    try {
      const commentsRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/commentThreads",
        {
          params: {
            key: API_KEY,
            part: "snippet",
            videoId: video.id,
            maxResults: 20,
          },
        }
      );

      const fetchedComments = commentsRes.data.items.map((item) => ({
        id: item.id,
        user: item.snippet.topLevelComment.snippet.authorDisplayName,
        avatar:
          item.snippet.topLevelComment.snippet.authorProfileImageUrl ||
          "/images/user.png",
        text: item.snippet.topLevelComment.snippet.textOriginal,
        time: new Date(
          item.snippet.topLevelComment.snippet.publishedAt
        ).toLocaleDateString(),
        likes: item.snippet.topLevelComment.snippet.likeCount,
      }));

      setComments(fetchedComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "You",
      avatar: "/images/user.png",
      time: "just now",
      text: newComment,
      likes: 0,
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const displayedVideos =
    searchResults.length > 0 ? searchResults : shuffleArray(videos);

  return (
    <div className="flex h-screen bg-gray-100">
      {selectedVideo ? (
        <VideoDetailsView
          selectedVideo={selectedVideo}
          displayedVideos={displayedVideos}
          handleSelectVideo={handleSelectVideo}
          comments={comments}
          setComments={setComments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          handleScroll={handleScroll}
        />
      ) : (
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <VideoSkeleton key={i} />)
            : displayedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onSelect={handleSelectVideo}
                />
              ))}
        </div>
      )}
    </div>
  );
}
