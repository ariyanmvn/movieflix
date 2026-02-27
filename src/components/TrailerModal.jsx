export default function TrailerModal({ media, onClose }) {
  if (!media) return null;

  // Generate VidKing embed URL
  let embedUrl = "";
  if (media.type === "movie") {
    embedUrl = `https://www.vidking.net/embed/movie/${media.id}`;
  } else if (media.type === "tv") {
    embedUrl = `https://www.vidking.net/embed/tv/${media.id}/${media.season}/${media.episode}`;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black rounded-xl overflow-hidden w-[90%] md:w-[900px] relative aspect-video">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 text-white text-2xl z-50"
        >
          ✕
        </button>

        {/* VidKing iframe */}
        <iframe
          className="w-full h-full"
          src={embedUrl}
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}