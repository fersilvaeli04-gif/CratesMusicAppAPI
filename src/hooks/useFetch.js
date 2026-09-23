import { useState, useEffect, useCallback } from 'react';

/**
 * Hook genérico para hacer peticiones GET y manejar
 * los estados de carga, éxito y error.
 *
 * @param {string|null} url - URL a consultar. Si es null, no se hace la petición.
 * @returns {{ data: any, loading: boolean, error: string|null, retry: () => void }}
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue exitosa.');
        }
        return response.json();
      })
      .then((json) => {
        if (!isCancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('Error en useFetch:', err);
          setError(err.message || 'Ocurrió un error inesperado.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [url, reloadIndex]);

  // Permite volver a disparar la misma petición (botón "Reintentar")
  const retry = useCallback(() => {
    setReloadIndex((prev) => prev + 1);
  }, []);

  return { data, loading, error, retry };
}

export default useFetch;
