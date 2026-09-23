import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const buildAlbumUrl = (id) =>
  `https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`;

function SongDetail() {
  const { id } = useParams();
  const { data, loading, error, retry } = useFetch(buildAlbumUrl(id));

  const album = data && data.album && data.album[0];

  return (
    <main className="app-main">
      <Link to="/" className="back-link">
        &larr; Volver a la búsqueda
      </Link>

      {loading && <p className="status-message">Cargando...</p>}

      {error && (
        <div className="status-message status-error">
          <p>Hubo un problema al cargar los datos. Intenta nuevamente.</p>
          <button className="retry-btn" onClick={retry}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && !album && (
        <p className="status-message">
          No se encontró información para esta canción.
        </p>
      )}

      {!loading && !error && album && (
        <section className="song-detail">
          <h2 className="song-section-title">{album.strAlbum}</h2>
          <p className="song-detail-row">
            <strong>Artista:</strong> {album.strArtist}
          </p>
          <p className="song-detail-row">
            <strong>Álbum:</strong> {album.strAlbum}
          </p>
          {album.intYearReleased && (
            <p className="song-detail-row">
              <strong>Año de lanzamiento:</strong> {album.intYearReleased}
            </p>
          )}
          {album.strGenre && (
            <p className="song-detail-row">
              <strong>Género:</strong> {album.strGenre}
            </p>
          )}
        </section>
      )}
    </main>
  );
}

export default SongDetail;
