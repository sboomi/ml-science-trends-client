import React from 'react';
import MainForm from '../components/DataSubmission/MainForm';

export default function Home() {
  return (
    <div>
      <h1>Check out our latest articles !</h1>

      {/* Must add a protected part on it */}
      <MainForm />
    </div>
  );
}
