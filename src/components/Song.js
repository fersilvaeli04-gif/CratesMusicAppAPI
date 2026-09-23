import React from 'react';
import { Link } from 'react-router-dom';

function Song({ id, index, title, artist, album, duration, onAdd }) {
  return (
    <div className="song-card">
      <div className="song-index">{index}</div>
      <div className="song-info">
        <Link to={`/song/${id}`} className="song-title-link">
          <p className="song-title">{title}</p>
        </Link>
        <p className="song-artist">{artist}</p>
        <p className="song-album">{album}</p>
      </div>
      {duration && <div className="song-duration">{duration}</div>}
      {onAdd && (
        <button className="song-add-btn" onClick={onAdd}>
          Agregar a mi biblioteca
        </button>
      )}
    </div>
  );
}

export default Song;
