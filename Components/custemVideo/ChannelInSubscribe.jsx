import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../Dashboard";

export const ChannelInfo = ({ channel }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState(0);

  useEffect(() => {
    const storedChannels = JSON.parse(
      localStorage.getItem("subscribedChannels") || "[]"
    );
    setSubscribed(storedChannels.some((c) => c.id === channel.id));
  }, [channel.id]);

  const handleSubscribe = () => {
    const storedChannels = JSON.parse(
      localStorage.getItem("subscribedChannels") || "[]"
    );

    if (!subscribed) {
      const updatedChannels = [...storedChannels, channel];
      localStorage.setItem(
        "subscribedChannels",
        JSON.stringify(updatedChannels)
      );
      setSubscribed(true);
    } else {
      const updatedChannels = storedChannels.filter((c) => c.id !== channel.id);
      localStorage.setItem(
        "subscribedChannels",
        JSON.stringify(updatedChannels)
      );
      setSubscribed(false);
    }
  };

  // fallback color if no avatar image
  const avatarFallback = useMemo(() => {
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

  const formatSubscribers = (count) => {
    const num = parseInt(count, 10) || 0;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M subscribers";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K subscribers";
    return num + " subscribers";
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/channels",
          {
            params: {
              key: API_KEY,
              part: "statistics",
              id: channel.id,
            },
          }
        );
        const count = res.data.items[0].statistics.subscriberCount;
        setSubscribers(count);
      } catch (error) {
        console.error("Error fetching channel subscribers:", error);
      }
    };

    if (channel?.id) fetchSubscribers();
  }, [channel.id]);

  return (
    <div className="flex items-start justify-between mt-3">
      <div className="flex items-center">
        {channel?.avatar ? (
          <img
            src={channel.avatar}
            alt={channel.name}
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: avatarFallback }}
          >
            {channel?.name?.[0]?.toUpperCase()}
          </div>
        )}

        <div>
          <p className="font-semibold text-lg">
            {channel?.name || "Unknown Channel"}
          </p>
          <p className="text-xs text-gray-500">
            {formatSubscribers(subscribers)}
          </p>
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        className={`px-4 py-2 rounded-full font-semibold cursor-pointer text-sm transition-colors ${
          subscribed
            ? "bg-gray-300 text-gray-800"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
      </button>
    </div>
  );
};

export default ChannelInfo;
