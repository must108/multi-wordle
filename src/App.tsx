import React from 'react';
import Words from './components/handleWord';
import Keyboard from './components/keyBoard';
import keys from './data/keys';

function App() {
  const word = Words();

  return (
    <>
      <h1>{word}</h1>
      <Keyboard keys={keys} />
    </>
  );
}

export default App;
