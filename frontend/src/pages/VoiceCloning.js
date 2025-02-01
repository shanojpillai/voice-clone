import React, { useState } from 'react';
import '../styles/VoiceCloning.css';

function VoiceCloning() {
  const [audioFile, setAudioFile] = useState(null);
  const [voiceName, setVoiceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('audio_file', audioFile);
    formData.append('voice_name', voiceName);

    try {
      const response = await fetch('http://localhost:8000/api/clone-voice', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="voice-cloning">
      <h1>Clone Your Voice</h1>
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
          <label>Audio File:</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Clone Voice'}
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default VoiceCloning; 