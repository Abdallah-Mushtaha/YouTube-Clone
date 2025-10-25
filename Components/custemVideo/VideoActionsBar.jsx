// VideoActionsBar.jsx
import React, { useState, useEffect } from "react";
import {
  FaDonate,
  FaDownload,
  FaShare,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

export const VideoActionsBar = ({ videoUrl, videoId }) => {
  const [likes, setLikes] = useState(4300);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const savedDownloads =
      JSON.parse(localStorage.getItem("downloadedVideos")) || [];
    const savedLikes = JSON.parse(localStorage.getItem("likedVideos")) || [];

    setDownloaded(savedDownloads.includes(videoId));
    setLiked(savedLikes.includes(videoId));
    setDisliked(false);

    setLikes(4300);
    setDislikes(0);
  }, [videoId]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      if (disliked) setDislikes(dislikes - 1);
      setLiked(true);
      setDisliked(false);
      saveToLocalStorage("likedVideos", videoId);
    } else {
      setLikes(likes - 1);
      setLiked(false);
      removeFromLocalStorage("likedVideos", videoId);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      if (liked) setLikes(likes - 1);
      setDisliked(true);
      setLiked(false);
    } else {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  const handleDownload = () => {
    setDownloaded(true);
    saveToLocalStorage("downloadedVideos", videoId);
    toast.success("⬇️ Video downloaded!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(videoUrl || window.location.href);
    toast.success("✅ Video link copied!");
  };

  const handleThanks = () => {
    toast("🙏 Thanks for supporting the creator!");
  };

  const saveToLocalStorage = (key, id) => {
    const videos = JSON.parse(localStorage.getItem(key)) || [];
    if (!videos.includes(id)) {
      videos.push(id);
      localStorage.setItem(key, JSON.stringify(videos));
    }
  };

  const removeFromLocalStorage = (key, id) => {
    const videos = JSON.parse(localStorage.getItem(key)) || [];
    const updatedVideos = videos.filter((video) => video !== id);
    localStorage.setItem(key, JSON.stringify(updatedVideos));
  };

  const handleSaveToPlaylist = () => {
    saveToLocalStorage("playlistVideos", videoId);
    toast.success("💾 Video saved to Playlist!");
    setShowMenu(false);
  };

  const buttonClass =
    "flex items-center bg-gray-200 px-3 py-2 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors";

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex items-center space-x-3 mb-4 justify-between">
        <div className="flex items-center space-x-3 text-sm">
          <button className={buttonClass.replace("px-3", "px-2")}>
            <FaThumbsUp
              onClick={handleLike}
              className={`mr-1 cursor-pointer ${liked ? "text-blue-500" : ""}`}
            />
            <span className="mr-2">{likes}</span>
            <span className="border-r border-gray-400 h-4 mr-2"></span>
            <FaThumbsDown
              onClick={handleDislike}
              className={`cursor-pointer`}
            />
            <span className="ml-2">{dislikes}</span>
          </button>

          <button className={buttonClass} onClick={handleShare}>
            <FaShare className="mr-1" /> Share
          </button>

          <button
            className={buttonClass + (downloaded ? " text-green-500" : "")}
            onClick={handleDownload}
          >
            <FaDownload className="mr-1" />{" "}
            {downloaded ? "Downloaded" : "Download"}
          </button>

          <button className={buttonClass} onClick={handleThanks}>
            <FaDonate className="mr-1" /> Thanks
          </button>

          <div className="relative">
            <button
              className="flex items-center bg-gray-200 p-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <HiOutlineDotsVertical />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2 text-sm">
                <p
                  className="py-1 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={handleSaveToPlaylist}
                >
                  Save to Playlist
                </p>
                <p className="py-1 hover:bg-gray-100 rounded">Report</p>
                <p className="py-1 hover:bg-gray-100 rounded">Not Interested</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoActionsBar;
