import React from 'react';
import { Words } from './components/handleWord';
import PlayBoard from './components/playBoard';

function App() {
  const word = Words();

  return (
    <>
      <h1>{word}</h1>
      <PlayBoard />
    </>
  );
}

export default App;
