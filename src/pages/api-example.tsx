import React from 'react';

const apiexample = () => {
  return (
    <div>
      <h1>API Example</h1>
      <p>The dev below show responses from the example API endpoints.</p>
      <p>
        <em>You must be signed in to see responses.</em>
      </p>
      <h2>Session</h2>
      <p>/api/dev/session</p>
      <iframe src="/api/dev/session" />
      <h2>JSON Web Token</h2>
      <p>/api/dev/jwt</p>
      <iframe src="/api/dev/jwt" />
    </div>
  );
};

export default apiexample;
