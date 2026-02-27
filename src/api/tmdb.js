import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchTrending = () =>
  instance.get(`/trending/all/week?api_key=${API_KEY}`);

export const fetchPopular = () =>
  instance.get(`/movie/popular?api_key=${API_KEY}`);

export const fetchTopRated = () =>
  instance.get(`/movie/top_rated?api_key=${API_KEY}`);

export const fetchDetails = (id, type) =>
  instance.get(`/${type}/${id}?api_key=${API_KEY}`);

export const fetchSeason = (tvId, seasonNumber) =>
  instance.get(`/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`);

export const searchMulti = (query) =>
  instance.get(`/search/multi?api_key=${API_KEY}&query=${query}`);

export const fetchEpisodeVideos = (tvId, seasonNumber, episodeNumber) =>
  instance.get(
    `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${API_KEY}`,
  );

export const fetchMovieVideos = (movieId) =>
  instance.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
