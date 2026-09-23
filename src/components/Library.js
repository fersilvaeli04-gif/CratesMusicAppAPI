import React from 'react';
import Song from './Song';

function Library({ songs }) {
  return (
    <section className="song-section">
      <h2 className="song-section-title">Mi biblioteca</h2>
      {songs.length === 0 ? (
        <p className="library-empty">
          Todavía no has agregado canciones. Búscalas arriba y añádelas aquí.
        </p>
      ) : (
        <div className="song-list">
          {songs.map((song, i) => (
            <Song
              key={song.id}
              id={song.id}
              index={i + 1}
              title={song.title}
              artist={song.artist}
              album={song.album}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Library;
