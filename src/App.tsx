import { useEffect, useState } from "react";
import { helpers } from "./utils/helpers";
import { type NewVideo, type Video } from "./types";
import VideoCard from "./components/ui/VideoCard";
import NewVideoModal from "./components/ui/NewVideoModal";

export default function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(
    "https://youtu.be/uSz4dQyG9g8?si=lcursX91P3phJuB2"
  );
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewVideo>({
    name: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("videos");
    if (stored) {
      const parsed = JSON.parse(stored);
      setVideos(parsed);
      if (parsed.length > 0) setCurrentVideo(parsed[0].url);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = helpers.getYouTubeId(form.url);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    const newVideo = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      url: form.url,
    };

    setVideos([newVideo, ...videos]);
    setForm({ name: "", description: "", url: "" });
    setShowModal(false);
    if (!currentVideo) setCurrentVideo(newVideo.url);
  };

  const handleDelete = (id: number) => {
    const filtered = videos.filter((v) => v.id !== id);
    setVideos(filtered);
    if (currentVideo && !filtered.some((v) => v.url === currentVideo)) {
      setCurrentVideo(filtered[0]?.url || null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:px-20 flex flex-col items-center">
      <nav className="w-full mb-6">
        <img
          src={"/icons/logo.svg"}
          alt="Logo"
          width={100}
          height={100}
          className="w-32 md:w-48"
        />
      </nav>
      <div className="w-full space-y-6">
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          {currentVideo ? (
            <iframe
              className="w-full h-64 sm:h-96"
              src={`https://www.youtube.com/embed/${helpers.getYouTubeId(
                currentVideo
              )}`}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-64 sm:h-96 text-gray-400">
              No video selected
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Video List</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Video
          </button>
        </div>

        <div className="bg-white shadow rounded-md">
          {videos.length === 0 ? (
            <p className="text-gray-500 p-3 sm:p-5">No videos added yet.</p>
          ) : (
            <ul className="space-y-3">
              {videos.map((video) => (
                <VideoCard
                  setCurrentVideo={setCurrentVideo}
                  handleDelete={handleDelete}
                  video={video}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {showModal && (
        <NewVideoModal
          close={() => setShowModal(false)}
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
