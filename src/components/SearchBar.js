import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = term.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Busca un artista (ej. Coldplay)"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <button type="submit" className="search-btn">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
