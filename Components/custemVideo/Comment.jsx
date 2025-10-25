import { FaEllipsisV, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export const CommentItem = ({ comment, updateComment }) => {
  const handleLike = () => {
    updateComment(comment.id, { likes: comment.likes + 1 });
  };

  const handleDislike = () => {
    updateComment(comment.id, { likes: Math.max(comment.likes - 1, 0) });
  };

  const randomAvatars = [
    "/imgs/user.png",
    "/imgs/user.png",
    "/imgs/user.png",
    "/imgs/user.png",
    "/imgs/user.png",
  ];

  const defaultAvatar =
    randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

  const avatar =
    comment.avatar &&
    typeof comment.avatar === "string" &&
    comment.avatar.trim() !== ""
      ? comment.avatar
      : defaultAvatar;

  return (
    <div className="flex mt-4 items-start">
      <img
        src={avatar}
        alt={comment.user || "User"}
        className="w-9 h-9 rounded-full mr-3 object-cover"
      />

      <div className="flex-1 text-left">
        <div className="flex items-center text-sm">
          <p className="font-semibold text-gray-900 mr-2">
            {comment.user || "Unknown"}
          </p>
          <p className="text-xs text-gray-500">{comment.time}</p>
        </div>

        <p className="mt-1 text-sm text-gray-800">{comment.text}</p>

        <div className="mt-2 flex items-center space-x-3 text-xs text-gray-600">
          <button
            onClick={handleLike}
            className="flex items-center hover:bg-gray-200 p-1 rounded"
          >
            <FaThumbsUp className="mr-1" /> {comment.likes}
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center hover:bg-gray-200 p-1 rounded"
          >
            <FaThumbsDown className="mr-1" />
          </button>
          <button className="hover:bg-gray-200 p-1 rounded font-semibold">
            Reply
          </button>
          <button className="p-1 rounded hover:bg-gray-200">
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
