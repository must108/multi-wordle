import React, { useEffect, useState } from 'react';
import PlayBoard from './components/playBoard';
import Title from './components/title';

function App() {
    const [showTitle, setShowTitle] = useState(true);
    const [showMode, setShowMode] = useState(false);
    const [showGame, setShowGame] = useState(false);

    const toggleTitle = () => {
        setShowMode(true);
        setShowTitle(false);
    };

    const handleMode = (mode: string) => {
        const event = new CustomEvent('modeChange', {
            detail: { mode }
        });
        window.dispatchEvent(event);
    };

  return (
    <>
        {showTitle ?         
        <div id="titleContainer">
            <Title />
            <button onClick={() => toggleTitle()}>play</button>
        </div>
        : null}

        {showMode ? 
            <div id="modeContainer">
            <h1>choose your gamemode:</h1>
            <div id="modeButtonContainer">
                <button onClick={() => handleMode('four')}>four</button>
                <button onClick={() => handleMode('five')}>five</button>
                <button onClick={() => handleMode('six')}>six</button>
            </div>
        </div>
        : null}

        {showGame ? <PlayBoard /> : null}
    </>
  );
}

export default App;
