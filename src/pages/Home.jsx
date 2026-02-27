import Row from "../components/Row";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
} from "../api/tmdb";

export default function Home() {
  return (
    <div className="pt-20">
      <Row title="Trending" fetchData={fetchTrending} />
      <Row title="Popular" fetchData={fetchPopular} />
      <Row title="Top Rated" fetchData={fetchTopRated} />
    </div>
  );
}