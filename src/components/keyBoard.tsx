import React, { useState, useEffect } from 'react';

interface Key {
    key: string;
}

interface KeyboardProps {
    keys: string[][];
}

export default function Keyboard({ keys }: KeyboardProps){
    const [letters, setLetters] = useState<Key[][] | null>(null);

    useEffect(() => {
        const convertKeys = keys.map(row => row.map(key => ({ key } as Key)));
        setLetters(convertKeys);
    }, [keys]);

    const sendLetter = (letter: string) => {
        const event = new CustomEvent('letterSent', {
            detail: { letter }
        });
        window.dispatchEvent(event);
    }

    const delLetter = () => {
        const event = new CustomEvent('deleteLetter');
        window.dispatchEvent(event);
    }

    const enterKey = () => {
        const event = new CustomEvent('enterPressed');
        window.dispatchEvent(event);
    }

    return (
        <>
            <div className="keyboard">
                <div className="first-row">
                    {letters && letters[0].map((keyObj, index) => (
                        <div key={index} 
                        className={`keyboard-button ${keyObj.key === 'i' ? 'i-key' : ''}`} 
                        onClick={() => sendLetter(keyObj.key)}>{keyObj.key}</div>
                    ))}
                </div>
                <div className="second-row">
                    {letters && letters[1].map((keyObj, index) => (
                            <div key={index} className="keyboard-button" onClick={() => sendLetter(keyObj.key)}>{keyObj.key}</div>
                    ))}
                </div>
                <div className="third-row">
                    <div className="keyboard-button" onClick={() => enterKey()}>ENTER</div>
                    {letters && letters[2].map((keyObj, index) => (
                        <div key={index} className="keyboard-button" onClick={() => sendLetter(keyObj.key)}>{keyObj.key}</div>
                    ))}
                    <div className="keyboard-button" onClick={() => delLetter()}>DEL</div>
                </div>
            </div>
        </>
    )
}