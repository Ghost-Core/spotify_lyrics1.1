import React, { useEffect } from 'react';

function Cache() {
  useEffect(() => {
    const clearCache = () => {
      localStorage.clear();
    };

    return () => {
      clearCache();
    };
  }, []);

  return <p>Cache cleared.</p>;
}

export default Cache;
