export default function EpisodeList({ episodes }) {
  return (
    <div className="bg-gray-900 p-4 rounded">
      {episodes.map((ep) => (
        <div key={ep.id} className="mb-2 border-b border-gray-700 pb-2">
          <h4 className="font-semibold">
            {ep.episode_number}. {ep.name}
          </h4>
          <p className="text-sm text-gray-400">{ep.overview}</p>
        </div>
      ))}
    </div>
  );
}