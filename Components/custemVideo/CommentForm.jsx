import { useState, useMemo } from "react";

export const CommentForm = ({
  newComment,
  setNewComment,
  setComments,
  currentUser = { name: "You", avatar: null },
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const avatarColor = useMemo(() => {
    const colors = [
      "#EF4444",
      "#F59E0B",
      "#10B981",
      "#3B82F6",
      "#8B5CF6",
      "#EC4899",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      text: newComment,
      time: "Just now",
      likes: 0,
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
    setIsFocused(false);
  };

  return (
    <div className="flex items-start mt-4">
      {currentUser.avatar ? (
        <img src={currentUser.avatar} className="w-9 h-9 rounded-full mr-3" />
      ) : (
        <div
          className="w-9 h-9 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: avatarColor }}
        >
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1">
        <textarea
          rows={isFocused || newComment.trim() ? 2 : 1}
          value={newComment}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !newComment.trim() && setIsFocused(false)}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none p-1 text-sm resize-none transition-all"
          placeholder="Add a public comment..."
        />

        {(isFocused || newComment.trim()) && (
          <div className="flex items-center justify-end mt-2 space-x-2">
            <button
              onClick={() => {
                setNewComment("");
                setIsFocused(false);
              }}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                newComment.trim()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
