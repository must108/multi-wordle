import React from 'react';
import PlayBoard from './components/playBoard';
import { Words } from './components/handleWord';

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
