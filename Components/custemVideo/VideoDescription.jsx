import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../Dashboard";

export const VideoDescription = ({ videoId }) => {
  const [description, setDescription] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const MAX_LENGTH = 200;

  useEffect(() => {
    if (!videoId) return;

    const fetchDescription = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              id: videoId,
            },
          }
        );
        const desc =
          res.data.items[0]?.snippet?.description || "No description available";
        setDescription(desc);
        setDescExpanded(false);
      } catch (err) {
        console.error("Error fetching video description:", err);
        setDescription("Failed to load description.");
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [videoId]);

  if (loading) {
    return <div className="mt-4 p-3 bg-gray-100 rounded animate-pulse h-24" />;
  }

  const isLong = description.length > MAX_LENGTH;
  const displayText =
    descExpanded || !isLong
      ? description
      : description.slice(0, MAX_LENGTH) + "...";

  return (
    <div className="mt-4 bg-gray-100 p-3 rounded-lg text-left">
      <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
        {displayText}
      </pre>
      {isLong && (
        <button
          onClick={() => setDescExpanded((s) => !s)}
          className="text-sm font-semibold text-gray-800 mt-2 hover:text-blue-600 transition-colors"
        >
          {descExpanded ? "Show Less..." : "Show More..."}
        </button>
      )}
    </div>
  );
};

export default VideoDescription;
