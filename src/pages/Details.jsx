import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetails } from "../api/tmdb";
import SeasonAccordion from "../components/SeasonAccordion";
import TrailerModal from "../components/TrailerModal";

export default function Details() {
  const { id, type } = useParams();
  const [data, setData] = useState(null);
  const [media, setMedia] = useState(null); // For modal

  useEffect(() => {
    fetchDetails(id, type).then((res) => setData(res.data));
  }, [id, type]);

  if (!data) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      {/* Backdrop Section */}
      <div
        className="relative  h-[50vh] md:h-[60vh] flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent"></div>

        <div className="relative mt-14 px-6 md:px-12 pb-8 max-w-5xl">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            {data.title || data.name}
          </h1>

          {/* Overview */}
          <p className="mt-4 text-gray-700 max-w-2xl text-sm md:text-base line-clamp-4">
            {data.overview}
          </p>

          {/* Movie Watch Button */}
          {type === "movie" && (
            <button
              onClick={() =>
                setMedia({
                  type: "movie",
                  id: id,
                })
              }
              className="mt-6 px-6 py-3 cursor-pointer rounded-xl bg-black text-white hover:opacity-90 transition"
            >
              ▶ Watch Now
            </button>
          )}
        </div>
      </div>

      {/* TV Seasons */}
      {type === "tv" && (
        <div className="px-6 md:px-12 lg:px-24 py-10">
          <SeasonAccordion
            type={type}
            tvId={id}
            seasons={data.seasons}
            onPlayTrailer={(mediaData) => setMedia(mediaData)}
          />
        </div>
      )}

      {/* Modal */}
      {media && <TrailerModal media={media} onClose={() => setMedia(null)} />}
    </div>
  );
}