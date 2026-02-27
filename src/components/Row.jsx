import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Row({ title, fetchData }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    fetchData().then((res) => setMovies(res.data.results));
  }, [fetchData]);

  const scroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 mt-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Movie List */}
      <div
        ref={rowRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}