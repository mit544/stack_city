import React, { useState, useRef, useEffect } from 'react';
import '../styles/searchbar.css'; // Import the CSS file

const SearchBar = ({ onSearch }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null); // Reference for input field

  const toggleSearchBar = () => {
    if (isSearchBarVisible) {
      if (searchQuery.trim() === "") {
        setIsSearchBarVisible(false);
      } else {
        handleSearchSubmit();
      }
    } else {
      setIsSearchBarVisible(true);
    }
  };

  useEffect(() => {
    if (isSearchBarVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchBarVisible]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearch && searchQuery.trim() !== "") {
      onSearch(searchQuery);
      setSearchQuery("");
      setIsSearchBarVisible(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className={`search-bar-container ${isSearchBarVisible ? 'search-bar-visible' : ''}`}>
      <input
        type="text"
        ref={inputRef}
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="[Enter Location Here]"
        className="search-bar-input"
      />

      <button onClick={toggleSearchBar} className="search-bar-button">
        <img
          src="/search-icon.svg"
          alt="Search"
          className="search-bar-icon"
        />
      </button>
    </div>
  );
};

export default SearchBar;
