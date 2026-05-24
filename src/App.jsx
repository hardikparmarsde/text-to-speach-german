import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Viewer from './pages/Viewer';

/**
 * App – root component with routing between Home and Viewer.
 * Sheet data is held here (temporary, in-memory only).
 */
export default function App() {
  const [sheets, setSheets] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home onDataExtracted={setSheets} />}
        />
        <Route
          path="/viewer"
          element={<Viewer sheets={sheets} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
