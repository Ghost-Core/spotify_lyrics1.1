import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import CurrentlyPlaying from './components/CurrentlyPlaying/CurrentlyPlaying';
import Lyrics from './components/Lyrics/Lyrics';
import Translation from './components/Translation/Translation';
import Cache from './components/Cache/Cache';
import ErrorHandling from './components/ErrorHandling/ErrorHandling';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/currently-playing" exact element={<CurrentlyPlaying />} />
        <Route path="/lyrics" exact element={<Lyrics />} />
        <Route path="/translation" exact element={<Translation />} />
        <Route path="/cache" exact element={<Cache />} />
        <Route path="/error-handling" exact element={<ErrorHandling />} />
      </Routes>
    </Router>
  );
}

export default App;
