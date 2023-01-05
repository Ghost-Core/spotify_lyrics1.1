import React, { useEffect, useState } from 'react';
import { getLyrics } from '../../utils/api';

function Lyrics() {
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentlyPlaying = JSON.parse(
          localStorage.getItem('currently_playing')
        );
        if (currentlyPlaying) {
          const response = await getLyrics(
            currentlyPlaying.artist,
            currentlyPlaying.name
          );
          if (response.status === 200) {
            setLyrics(response.data);
          } else {
            setError('Error retrieving lyrics.');
          }
        } else {
          setError('No currently playing song data found.');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {lyrics ? (
        <>
          <h2>Lyrics</h2>
          <pre>{lyrics}</pre>
        </>
      ) : (
        <p>No lyrics found.</p>
      )}
    </div>
  );
}

export default Lyrics;
