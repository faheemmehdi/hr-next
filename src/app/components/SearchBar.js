"use client";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  className = "",
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch?.(query);
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div
      className={`relative w-full max-w-sm ${className}`}
    >
      {/* Search Icon inside input */}
      <IoSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-xxs text-gray-400"
        size={18}
      />

      <input
        type="search"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-3 py-2 
          text-xs text-gray-700 
          bg-white border border-gray-300 
          rounded 
          focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-8ring-gray-500
          placeholder:text-gray-400
          transition-all duration-200
        "
      />
    </div>
  );
}
