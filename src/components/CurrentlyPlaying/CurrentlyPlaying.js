import React, { useEffect, useState } from 'react';
import { getCurrentlyPlaying } from '../../utils/api';

function CurrentlyPlaying() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await getCurrentlyPlaying(accessToken);
          if (response.status === 200) {
            setCurrentlyPlaying(response.data);
          } else {
            setError('Error retrieving currently playing song.');
          }
        } else {
          setError('No access token found.');
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
      {currentlyPlaying ? (
        <>
          <h2>Currently Playing</h2>
          <p>{currentlyPlaying.name}</p>
          <p>{currentlyPlaying.artist}</p>
          <p>{currentlyPlaying.album}</p>
        </>
      ) : (
        <p>No song is currently playing.</p>
      )}
    </div>
  );
}

export default CurrentlyPlaying;
