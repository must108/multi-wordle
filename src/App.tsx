import React, { useEffect, useState } from 'react';
import PlayBoard from './components/playBoard';
import Title from './components/title';
import { ModeSelect } from './components/modeSelect';

function App() {
    const [showTitle, setShowTitle] = useState(true);
    const [showMode, setShowMode] = useState(false);
    const [showGame, setShowGame] = useState(false);

    useEffect(() => {
        window.addEventListener('titleToggle', () => {
            setShowTitle(false);
            setShowMode(true);
        });

        window.addEventListener('gameToggle', () => {
            setShowMode(false);
            setShowGame(true);
        });

        return () => {
            window.removeEventListener('titleToggle', () => {});
        }

    }, []);

  return (
    <>
        {showTitle ? <Title /> : null}
        {showMode ? <ModeSelect/> : null}
        {showGame ? <PlayBoard /> : null}
    </>
  );
}

export default App;
