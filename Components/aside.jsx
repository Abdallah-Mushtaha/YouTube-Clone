// Sidebar.jsx
import React, { useState } from "react";
import { FiHome, FiCompass } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import { CgPlayListSearch } from "react-icons/cg";
import { GiBackwardTime } from "react-icons/gi";
import { BsFillCollectionPlayFill, BsBell } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { LiaDownloadSolid } from "react-icons/lia";

import Dashboard from "../Components/Dashboard";
import Nav from "../Components/Header";
import Explore from "./Explore";
import { SubscribedChannels } from "./Subscriptions";
import { Notifications } from "./Notifications";
import { WatchLater } from "./WatchLater";
import { LikedVideos } from "./LikedVideos";
import { Playlists } from "./Playlists";
import { Downloads } from "./Downloads";

import { useDispatch } from "react-redux";
import { clearVideo } from "../src/videoSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePage, setActivePage] = useState("Home");

  const menuItems = [
    { icon: FiHome, text: "Home", page: "Home" },
    { icon: FiCompass, text: "Explore", page: "Explore" },
    {
      icon: BsFillCollectionPlayFill,
      text: "Subscriptions",
      page: "Subscriptions",
    },
    { icon: BsBell, text: "Notifications", page: "Notifications" },
    { icon: GiBackwardTime, text: "Watch later", page: "WatchLater" },
    { icon: BiSolidLike, text: "Liked videos", page: "LikedVideos" },
    { icon: CgPlayListSearch, text: "Playlists", page: "Playlists" },
    { icon: LiaDownloadSolid, text: "Downloads", page: "Downloads" },
  ];

  const handlePageClick = (page) => {
    setActivePage(page);
    if (page === "Home") dispatch(clearVideo());
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar for desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ${
          isExpanded ? "w-60" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            <FaList className="size-7" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  onClick={() => handlePageClick(item.page)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    activePage === item.page
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  } ${isExpanded ? "justify-start" : "justify-center"}`}
                >
                  <item.icon className="w-6 h-6" />
                  {isExpanded && <span className="ml-3">{item.text}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Bottom Navbar for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex md:hidden justify-around p-2 z-50">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handlePageClick(item.page)}
            className={`flex flex-col items-center text-gray-600 ${
              activePage === item.page ? "text-blue-500" : ""
            }`}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Nav />
        <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
          {activePage === "Home" && <Dashboard />}
          {activePage === "Explore" && <Explore />}
          {activePage === "Subscriptions" && <SubscribedChannels />}
          {activePage === "Notifications" && <Notifications />}
          {activePage === "WatchLater" && <WatchLater />}
          {activePage === "LikedVideos" && <LikedVideos />}
          {activePage === "Playlists" && <Playlists />}
          {activePage === "Downloads" && <Downloads />}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
