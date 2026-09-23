import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Library from '../components/Library';
import useFetch from '../hooks/useFetch';

const buildSearchUrl = (artistName) =>
  `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(
    artistName
  )}`;

function Home({ library, onAddToLibrary }) {
  const [artistQuery, setArtistQuery] = useState('');

  const url = artistQuery ? buildSearchUrl(artistQuery) : null;
  const { data, loading, error, retry } = useFetch(url);

  // Transformamos los álbumes de la API en objetos "canción"
  // que nuestros componentes (Song, SearchResults, Library) ya saben mostrar.
  const songs =
    data && data.album
      ? data.album.map((album) => ({
          id: album.idAlbum,
          title: album.strAlbum,
          artist: album.strArtist,
          album: album.strAlbum,
        }))
      : [];

  return (
    <main className="app-main">
      <section className="song-section">
        <h2 className="song-section-title">Buscar canciones</h2>
        <SearchBar onSearch={setArtistQuery} />

        {!artistQuery && (
          <p className="status-message">
            Busca un artista para ver sus álbumes, por ejemplo "Coldplay" u
            "Oasis".
          </p>
        )}

        {loading && <p className="status-message">Cargando...</p>}

        {error && (
          <div className="status-message status-error">
            <p>Hubo un problema al cargar los datos. Intenta nuevamente.</p>
            <button className="retry-btn" onClick={retry}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && artistQuery && songs.length === 0 && (
          <p className="status-message">
            No se encontraron resultados para "{artistQuery}".
          </p>
        )}

        {!loading && !error && songs.length > 0 && (
          <SearchResults songs={songs} onAddToLibrary={onAddToLibrary} />
        )}
      </section>

      <Library songs={library} />
    </main>
  );
}

export default Home;
