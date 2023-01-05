import axios from 'axios';
import { Buffer } from 'buffer';
import {
  SPOTIFY_API_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '..//config/apis';
import { GENIUS_API_URL, GENIUS_ACCESS_TOKEN } from '..//config/apis';
import {
  GOOGLE_TRANSLATE_API_URL,
  GOOGLE_TRANSLATE_API_KEY,
} from '..//config/apis';

export const login = async (username, password) => {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('username', username);
  data.append('password', password);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  };
  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/api/token`,
      data,
      config
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAccessToken = async () => {
  const encoded = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('Content-Type', 'application/x-www-form-urlencoded');
  data.append('scope', 'user-read-currently-playing');
  const config = {
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  };
  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/api/token`,
      data,
      config
    );
    return response.data.access_token;
  } catch (err) {
    throw err;
  }
};

export const getCurrentlyPlaying = async () => {
  const accessToken = localStorage.getItem('access_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    console.log(accessToken);
    const response = await axios.get(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      config
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getLyrics = async (artist, song) => {
  const config = {
    headers: {
      Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(
      `${GENIUS_API_URL}/search?q=${encodeURIComponent(`${artist} ${song}`)}`,
      config
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const translateText = async (text, target) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = {
    q: text,
    target: target,
  };
  try {
    const response = await axios.post(
      `${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
      data,
      config
    );
    return response;
  } catch (err) {
    throw err;
  }
};
