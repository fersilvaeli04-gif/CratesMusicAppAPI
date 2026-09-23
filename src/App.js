import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SongDetail from './pages/SongDetail';
import './App.css';

function App() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    console.log('La biblioteca se ha actualizado:', library);
  }, [library]);

  const handleAddToLibrary = (song) => {
    setLibrary((prevLibrary) => {
      if (prevLibrary.some((s) => s.id === song.id)) {
        return prevLibrary;
      }
      return [...prevLibrary, song];
    });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home library={library} onAddToLibrary={handleAddToLibrary} />}
          />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
