import { useState } from "react";
import { fetchSeason } from "../api/tmdb";
import { ChevronDown } from "lucide-react";

export default function SeasonAccordion({ tvId, seasons, onPlayTrailer }) {
  const [episodes, setEpisodes] = useState({});
  const [openSeason, setOpenSeason] = useState(null);
  const [loadingSeason, setLoadingSeason] = useState(null);

  // Toggle season accordion
  const handleSeasonClick = async (seasonNumber) => {
    if (openSeason === seasonNumber) {
      setOpenSeason(null);
      return;
    }

    if (!episodes[seasonNumber]) {
      setLoadingSeason(seasonNumber);
      const res = await fetchSeason(tvId, seasonNumber);

      setEpisodes((prev) => ({
        ...prev,
        [seasonNumber]: res.data.episodes,
      }));

      setLoadingSeason(null);
    }

    setOpenSeason(seasonNumber);
  };

  // Pass media object to parent modal
  const handleEpisodeClick = (seasonNumber, episodeNumber) => {
    onPlayTrailer({
      type: "tv",
      id: tvId,
      season: seasonNumber,
      episode: episodeNumber,
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Seasons</h2>

      <div className="space-y-6">
        {seasons.map((season) => (
          <div
            key={season.id}
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            {/* Season Header */}
            <button
              onClick={() => handleSeasonClick(season.season_number)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="text-left">
                <h3 className="font-medium text-lg">{season.name}</h3>
                <p className="text-sm text-gray-500">
                  {season.episode_count} Episodes
                </p>
              </div>

              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  openSeason === season.season_number ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Episodes Accordion */}
            <div
              className={`transition-all duration-300 ${
                openSeason === season.season_number
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-6 pb-6 space-y-4">
                {loadingSeason === season.season_number && (
                  <p className="text-sm text-gray-500">
                    Loading episodes...
                  </p>
                )}

                {episodes[season.season_number]?.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() =>
                      handleEpisodeClick(season.season_number, ep.episode_number)
                    }
                    className="flex gap-4 cursor-pointer group hover:bg-gray-50 rounded-lg p-2 transition"
                  >
                    {/* Thumbnail */}
                    {ep.still_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                        alt={ep.name}
                        className="w-28 h-16 object-cover rounded-lg"
                      />
                    )}

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-black transition">
                        {ep.episode_number}. {ep.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {ep.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}