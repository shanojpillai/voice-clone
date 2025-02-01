import React, { useState } from 'react';
import '../styles/VoiceGeneration.css';

function VoiceGeneration() {
  const [text, setText] = useState('');
  const [voiceName, setVoiceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/generate-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voice_name: voiceName }),
      });
      
      const data = await response.json();
      if (data.audio_path) {
        setAudioUrl(`http://localhost:8000/${data.audio_path}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="voice-generation">
      <h1>Generate Speech</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Voice Name:</label>
          <input
            type="text"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Speech'}
        </button>
      </form>
      {audioUrl && (
        <div className="audio-player">
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default VoiceGeneration; 