import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "./Dashboard";
import ChannelDetailsView from "./ChannelDetailsView";
import { BsFillCollectionPlayFill } from "react-icons/bs";

const ChannelSkeleton = () => (
  <div className="bg-white shadow rounded-2xl overflow-hidden animate-pulse p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-gray-300 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

export const SubscribedChannels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSubscribedChannels = async () => {
      const savedChannels =
        JSON.parse(localStorage.getItem("subscribedChannels")) || [];

      if (savedChannels.length === 0) {
        setChannels([]);
        setLoading(false);
        return;
      }

      try {
        const channelIds = savedChannels.map((c) => c.id).filter((id) => id);
        if (channelIds.length > 0) {
          setChannels(savedChannels);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/channels",
          {
            params: {
              key: API_KEY,
              part: "snippet,statistics",
              id: channelIds.join(","),
            },
          }
        );

        const formattedChannels = res.data.items.map((c) => ({
          id: c.id,
          name: c.snippet.title,
          avatar:
            c.snippet.thumbnails?.high?.url ||
            c.snippet.thumbnails?.medium?.url ||
            c.snippet.thumbnails?.default?.url ||
            "https://via.placeholder.com/48",
          subscribers:
            Number(c.statistics.subscriberCount).toLocaleString() +
            " subscribers",
          description: c.snippet.description,
        }));

        if (isMounted && formattedChannels.length > 0) {
          setChannels(formattedChannels);
          setLoading(false);
        } else if (isMounted) {
          setTimeout(fetchSubscribedChannels, 2000);
        }
      } catch (error) {
        if (isMounted) setTimeout(fetchSubscribedChannels, 2000);
      }
    };

    fetchSubscribedChannels();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
  };

  if (selectedChannel) {
    return (
      <ChannelDetailsView
        selectedChannel={selectedChannel}
        handleBack={() => setSelectedChannel(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsFillCollectionPlayFill /> Subscribed Channels
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => <ChannelSkeleton key={i} />)
        ) : channels.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            There is no subscribed channels.
          </div>
        ) : (
          channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleSelectChannel(channel)}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer flex items-center p-4 gap-4"
            >
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-12 h-12 rounded-full"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/48")
                }
              />
              <div>
                <h2 className="font-bold text-lg line-clamp-1">
                  {channel.name}
                </h2>
                <p className="text-sm text-gray-500">{channel.subscribers}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
