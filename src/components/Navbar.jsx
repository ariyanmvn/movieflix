import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false); // mobile search state
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery("");
    setMobileOpen(false); // close mobile search after search
  };

  // Auto-focus the input when mobile search opens
  useEffect(() => {
    if (mobileOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-red-600 text-2xl sm:text-3xl font-extrabold tracking-wide"
          >
            Movie<span className="text-white">Flix</span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="relative hidden sm:block"
          >
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              placeholder="Search movies or series..."
              onChange={(e) => setQuery(e.target.value)}
              className="bg-black/50 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition w-64 md:w-80"
            />
          </form>

          {/* Mobile Search */}
          <div className="sm:hidden relative">
            {mobileOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-black/70 text-white pl-4 pr-10 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 w-48 transition"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="absolute right-2"
                >
                  <X size={18} className="text-white" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
              >
                <Search size={18} />
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}