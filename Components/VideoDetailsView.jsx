import React from "react";
import ChannelInfo from "./custemVideo/ChannelInSubscribe";
import { CommentsSection } from "./custemVideo/CommentsSection";
import VideoActionsBar from "./custemVideo/VideoActionsBar";
import VideoDescription from "./custemVideo/VideoDescription";
import VideoPlayer from "./custemVideo/VideoPlayer";

const VideoDetailsView = ({
  selectedVideo,
  displayedVideos,
  handleSelectVideo,
  comments,
  setComments,
  newComment,
  setNewComment,
  handleAddComment,
  handleScroll,
}) => {
  return (
    <div className="flex w-full">
      {/* Main Video Section */}
      <main className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <VideoPlayer url={selectedVideo.url} />

        <div className="mt-4">
          <h1 className="text-xl font-bold mb-1">{selectedVideo.title}</h1>
          <p className="text-sm text-gray-600 mb-4">
            {selectedVideo.views} • {selectedVideo.timeAgo}
          </p>

          <VideoActionsBar
            videoId={selectedVideo.id}
            videoUrl={selectedVideo.url}
          />

          <VideoDescription videoId={selectedVideo.id} />

          <ChannelInfo channel={selectedVideo.channel} />

          <CommentsSection
            comments={comments}
            setComments={setComments}
            handleAddComment={handleAddComment}
            newComment={newComment}
            setNewComment={setNewComment}
          />
        </div>
      </main>

      {/* Sidebar with Suggested Videos */}
      <aside
        className="w-80 p-4 overflow-y-auto scrollbar-hide bg-white hidden lg:block"
        onScroll={handleScroll}
      >
        {displayedVideos
          .filter((v) => v.id !== selectedVideo.id)
          .map((video) => (
            <div
              key={video.id}
              onClick={() => handleSelectVideo(video)}
              className="cursor-pointer mb-4 flex items-center"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 h-20 object-cover rounded-lg mr-2"
              />
              <div className="flex-1 text-sm">
                <h4 className="font-semibold line-clamp-2">{video.title}</h4>
                <p className="text-gray-500 text-xs">{video.channel.name}</p>
              </div>
            </div>
          ))}
      </aside>
    </div>
  );
};

export default VideoDetailsView;
