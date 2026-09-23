import React from 'react';
import Song from './Song';

function SearchResults({ songs, onAddToLibrary }) {
  return (
    <div className="song-list">
      {songs.map((song, i) => (
        <Song
          key={song.id}
          id={song.id}
          index={i + 1}
          title={song.title}
          artist={song.artist}
          album={song.album}
          onAdd={() => onAddToLibrary(song)}
        />
      ))}
    </div>
  );
}

export default SearchResults;
