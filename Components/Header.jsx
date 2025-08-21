import React from "react";
import { TbVideoPlus } from "react-icons/tb";
import { FaBell } from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu";
import { Link } from "react-router-dom";
import youtube from "../public/imgs/youtube.png";
import { IoSearch } from "react-icons/io5";
import { LuList } from "react-icons/lu";

export default function Header({ menu, setMenu }) {
  const handelmenuo = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  return (
    <div
      className="bg-gray-100 py-2 flex justify-center max-w-screen mx-auto select-none"
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="container flex justify-between items-center px-3 md:px-6 gap-5">
        <LuList
          className="text-2xl text-gray-600 flex justify-start items-start "
          onClick={handelmenuo}
        />

        <Link to="#" className="flex-shrink-0">
          <img src={youtube} className="w-14 md:w-14 lg:w-16" alt="Youtube" />
        </Link>

        <form className="flex-1 mx-3 md:mx-5 flex justify-center">
          <label className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none text-sm md:text-base"
              placeholder="Search"
            />
            <button
              type="submit"
              className="bg-gray-200 p-1 md:p-2 outline-0 border border-gray-300 cursor-pointer rounded-full absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Search"
              onClick={(e) => e.preventDefault()}
            >
              <IoSearch />
            </button>
          </label>
        </form>

        <div className="icons flex justify-end items-end gap-3 sm:gap-4 md:gap-5 text-lg md:text-xl">
          <TbVideoPlus className="hidden sm:block cursor-pointer text-black text-2xl" />
          <LuBlocks className="hidden md:block cursor-pointer text-black text-2xl" />
          <FaBell className="cursor-pointer text-black text-2xl" />
          <i className="fa fa-envelope hidden md:block cursor-pointer"></i>
          <i className="fa fa-user cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}
