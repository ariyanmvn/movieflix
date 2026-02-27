import { useState } from "react";

export default function TrailerModal({ media, onClose }) {
  const [server, setServer] = useState("server1");

  if (!media) return null;

  // Generate Embed URL based on selected server
  let embedUrl = "";

  if (server === "server1") {
    // VidKing
    if (media.type === "movie") {
      embedUrl = `https://www.vidking.net/embed/movie/${media.id}`;
    } else if (media.type === "tv") {
      embedUrl = `https://www.vidking.net/embed/tv/${media.id}/${media.season}/${media.episode}`;
    }
  }

  if (server === "server2") {
    // VidSrc
    if (media.type === "movie") {
      embedUrl = `https://vidsrc.wtf/api/1/movie/?id=${media.id}&color=e01621`;
    } else if (media.type === "tv") {
      embedUrl = `https://vidsrc.wtf/api/1/tv/?id=${media.id}&s=${media.season}&e=${media.episode}&color=e01621`;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-black rounded-xl overflow-hidden w-[90%] md:w-[900px] relative aspect-video">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 text-white text-2xl z-50"
        >
          ✕
        </button>

        {/* Server Buttons */}
        <div className="absolute top-3 left-3 z-50 flex gap-2">
          <button
            onClick={() => setServer("server1")}
            className={`px-3 py-1 rounded cursor-pointer text-sm ${
              server === "server1"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            Server 1
          </button>

          <button
            onClick={() => setServer("server2")}
            className={`px-3 py-1 rounded cursor-pointer text-sm ${
              server === "server2"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            Server 2
          </button>
        </div>

        {/* Iframe */}
        <iframe
          key={server} // forces reload when switching server
          className="w-full h-full"
          src={embedUrl}
          // sandbox={
          //   server === "server1" || server === "server1"
          //     ? "allow-scripts allow-same-origin allow-forms"
          //     : undefined
          // }
          sandbox="allow-scripts allow-same-origin allow-forms"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
