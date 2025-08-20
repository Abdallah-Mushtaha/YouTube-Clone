import React from "react";
import Aside from "../Components/aside";

export default function Home() {
  return (
    <div className="flex">
      <Aside />
      <div className="flex justify-center items-center w-full h-screen bg-red-500"></div>
    </div>
  );
}
