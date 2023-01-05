import React, { useEffect } from 'react';

function ErrorHandling() {
  useEffect(() => {
    const logErrors = (error, errorInfo) => {
      console.error(error, errorInfo);
    };

    return () => {
      logErrors();
    };
  }, []);

  return <p>Errors logged.</p>;
}

export default ErrorHandling;
