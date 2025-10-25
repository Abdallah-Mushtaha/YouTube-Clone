import React, { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { clearVideo, setSearchResults } from "../src/videoSlice";
import axios from "axios";
import { API_KEY } from "./Dashboard";

const Nav = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            part: "snippet",
            q: query,
            maxResults: 12,
            type: "video",
          },
        }
      );

      const results = res.data.items.map((v) => ({
        id: v.id.videoId,
        title: v.snippet.title,
        url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
        thumbnail: v.snippet.thumbnails.high.url,
        channel: {
          name: v.snippet.channelTitle,
          avatar: v.snippet.thumbnails?.default?.url || "",
        },
        timeAgo: new Date(v.snippet.publishedAt).toDateString(),
      }));

      dispatch(setSearchResults(results));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center justify-between w-full px-2 md:px-4 py-2 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
        onClick={() => dispatch(clearVideo())}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube Logo"
          className="h-6 md:h-6"
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-2 md:mx-4">
        <div className="relative flex items-center bg-gray-100 rounded-full border border-gray-300 w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full py-2 pl-4 pr-12 text-sm bg-transparent outline-none rounded-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <div
            className="absolute right-0 flex items-center h-full px-2 space-x-1 cursor-pointer"
            onClick={handleSearch}
          >
            <FiSearch className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Create Button */}
        <button className="hidden md:flex items-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition duration-150">
          <FiPlus className="w-4 h-4 mr-1" />
          Create
        </button>

        {/* Notification - hidden on mobile */}
        <div className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-full hidden sm:block">
          <LuBellRing className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 border border-white rounded-full"></span>
        </div>

        {/* User Avatar */}
        <div className="ml-2 cursor-pointer">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
