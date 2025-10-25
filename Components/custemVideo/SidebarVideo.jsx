import { BsThreeDotsVertical } from "react-icons/bs";

export const SidebarVideo = ({ video, onSelect }) => (
  <div
    className="mb-3 cursor-pointer flex hover:bg-gray-200 p-1 rounded transition-colors"
    onClick={() => onSelect(video)}
  >
    <div className="relative flex-shrink-0 w-40 h-20 mr-2">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover rounded"
      />
      {video.duration && (
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded-sm">
          {video.duration}
        </span>
      )}
    </div>
    <div className="flex-1 text-left flex justify-between">
      <div>
        <p className="text-sm font-semibold leading-snug line-clamp-2">
          {video.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {video.channel.name}
          {video.channel.isVerified && (
            <svg
              className="inline ml-1 w-3 h-3 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </p>
        <p className="text-xs text-gray-500">
          {video.views} • {video.timeAgo}
        </p>
      </div>
      <button className="text-gray-500 hover:text-gray-700 p-1 self-start">
        <BsThreeDotsVertical size={16} />
      </button>
    </div>
  </div>
);

export default SidebarVideo;
