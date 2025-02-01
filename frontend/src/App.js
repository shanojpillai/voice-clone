import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import VoiceCloning from './pages/VoiceCloning';
import VoiceGeneration from './pages/VoiceGeneration';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<VoiceCloning />} />
            <Route path="/generate" element={<VoiceGeneration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 