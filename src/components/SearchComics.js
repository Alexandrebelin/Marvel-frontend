import React from "react";

const SearchComics = ({ search, setSearch, handleSearchChar }) => {
  return (
    <div className="searchContainer">
      <form onSubmit={handleSearchChar}>
        <input
          type="search"
          placeholder="What are you looking for ?"
          className="searchInput"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchComics;
