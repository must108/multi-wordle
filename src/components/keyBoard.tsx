import { useState, useEffect } from 'react';

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

    return (
        <>
            <div className="keyboard">
                <div className="first-row">
                    {letters && letters[0].map((keyObj, index) => (
                        <div key={index} className="keyboard-button">{keyObj.key}</div>
                    ))}
                </div>
                <div className="second-row">
                    {letters && letters[1].map((keyObj, index) => (
                            <div key={index} className="keyboard-button">{keyObj.key}</div>
                    ))}
                </div>
                <div className="third-row">
                    {letters && letters[2].map((keyObj, index) => (
                        <div key={index} className="keyboard-button">{keyObj.key}</div>
                    ))}
                </div>
            </div>
        </>
    )
}