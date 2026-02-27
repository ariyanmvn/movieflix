import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { searchMulti } from "../api/tmdb";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const queryParam = useQuery().get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Search function for button click
  const handleSearchClick = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
  };

  useEffect(() => {
    if (!queryParam) return;

    setLoading(true);
    searchMulti(queryParam)
      .then((res) => {
        // filter out people results
        const filtered = res.data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        setResults(filtered);
      })
      .finally(() => setLoading(false));
  }, [queryParam]);

  if (!queryParam)
    return (
      <div className="pt-32 text-center text-gray-400">
        Start searching for movies or TV shows...
      </div>
    );

  return (
    <div className="pt-28 px-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Results for "{queryParam}"</h2>

      {/* Mobile Search Button + Input */}
      <div className="sm:hidden mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 bg-black/50 text-white pl-4 pr-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        />
        <button
          onClick={handleSearchClick}
          className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-full transition"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Searching...</div>
      ) : results.length === 0 ? (
        <div className="text-gray-500">No results found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((item) => (
            <Link
              key={item.id}
              to={`/details/${item.media_type}/${item.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/no-image.png"
                  }
                  className="rounded-lg group-hover:scale-105 transition duration-300"
                  alt={item.title || item.name}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-sm text-center px-2">
                    {item.title || item.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}