import React from "react";

const VideoCard = ({ video, onSelect }) => {
  return (
    <div
      className="cursor-pointer w-full bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
      onClick={() => onSelect(video)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {video.channel.name} • {video.views} • {video.timeAgo}
        </p>
        {video.channel.avatar && (
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-6 h-6 rounded-full mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default VideoCard;
