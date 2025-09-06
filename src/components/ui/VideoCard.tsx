import type { Dispatch } from "react";
import type { Video } from "../../types";

const VideoCard = ({
  video,
  setCurrentVideo,
  handleDelete,
}: {
  video: Video;
  setCurrentVideo: Dispatch<string>;
  handleDelete: (id: number) => void;
}) => {
  return (
    <li
      key={video.id}
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-b-gray-500 last:border-none p-3 sm:p-5 hover:bg-gray-50"
    >
      <div className="mb-2 sm:mb-0">
        <p className="font-medium text-gray-800">{video.name}</p>
        <p className="text-sm text-gray-500">{video.description}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentVideo(video.url)}
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Watch
        </button>
        <button
          onClick={() => handleDelete(video.id)}
          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default VideoCard;
