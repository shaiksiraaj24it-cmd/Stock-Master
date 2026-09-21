function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}) {

  return (

    <div className="search-bar">

      <span>
        🔍
      </span>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />

    </div>
  );
}

export default SearchBar;