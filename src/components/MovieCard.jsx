import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const type = movie.media_type || "movie";

  return (
    <Link to={`/details/${type}/${movie.id}`}>
      <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-[210px] sm:h-[240px] md:h-[270px] object-cover"
        />

        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {movie.title || movie.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}