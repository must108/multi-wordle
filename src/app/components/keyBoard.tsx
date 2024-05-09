"use client";

import React, { useState, useEffect } from 'react';

let GAME_DONE: string = "";

interface Key {
    key: string;
}

interface KeyboardProps {
    keys: string[][];
}

export default function Keyboard({ keys }: KeyboardProps){
    const [letters, setLetters] = useState<Key[][] | null>(null);

    useEffect(() => {

        const handleFade = (e: CustomEvent) => {
            const letter = e.detail.letter;
            const ele = document.getElementById(letter.toLowerCase());
            ele!.classList.add('opacity-25');
        };

        window.addEventListener('finished', () => {
            GAME_DONE = 'DONE';
        });
        window.addEventListener('fadeLetter', handleFade as EventListener);

        return () => {
            window.removeEventListener('finished', () => {});
            window.removeEventListener('fadeLetter', 
                        handleFade as EventListener);
        }
    }, []);

    useEffect(() => {
        const convertKeys = keys.map(row => row.map(key => ({ key } as Key)));
        setLetters(convertKeys);
    }, [keys]);

    const sendLetter = (letter: string) => {
        if (GAME_DONE !== 'DONE') {
            window.dispatchEvent(new CustomEvent('letterSent', {
                detail: { letter }
            }));
        }
    }

    const delLetter = () => {
        if (GAME_DONE !== 'DONE') {
            window.dispatchEvent(new CustomEvent('deleteLetter'));
        }
    }

    const enterKey = () => {
        if (GAME_DONE !== 'DONE') {
            window.dispatchEvent(new CustomEvent('enterPressed'));
        }
    }

    return (
        <>
            <div className="keyboard my-4 flex flex-col items-center">
                <div className="first-row flex gap-1">
                    {letters && letters[0].map((keyObj, index) => (
                        <div key={index} 
                        className={`bg-[#818384] hover:bg-[#525455] 
                        text-base font-bold p-[0.8rem] my-1 cursor-pointer 
                        uppercase select-none rounded-[3px] transition-all 
                        duration-300 keyboard-button ${keyObj.key === 'i' ? 
                        'py-[0.8rem] px-[1rem]' : ''}`} 
                        onClick={() => sendLetter(keyObj.key)}
                        id={(keyObj.key).toLowerCase()}>{keyObj.key}</div>
                    ))}
                </div>
                <div className="second-row flex gap-1">
                    {letters && letters[1].map((keyObj, index) => (
                            <div key={index} className="keyboard-button 
                            bg-[#818384] hover:bg-[#525455] text-base 
                            font-bold p-[0.8rem] my-1 cursor-pointer 
                            uppercase select-none rounded-[3px] 
                            transition-all duration-300" 
                            onClick={() => sendLetter(keyObj.key)}
                            id={keyObj.key}>{keyObj.key}</div>
                    ))}
                </div>
                <div className="third-row flex gap-1">
                    <div className="keyboard-button bg-[#818384] 
                    hover:bg-[#525455] text-base font-bold p-[0.8rem] 
                    my-1 cursor-pointer uppercase select-none rounded-[3px] 
                    transition-all duration-300" onClick={() => enterKey()}>
                    ENTER
                    </div>
                    {letters && letters[2].map((keyObj, index) => (
                        <div key={index} className="keyboard-button 
                        bg-[#818384] hover:bg-[#525455] text-base 
                        font-bold p-[0.8rem] my-1 cursor-pointer uppercase 
                        select-none rounded-[3px] transition-all duration-300" 
                        onClick={() => sendLetter(keyObj.key)}
                        id={keyObj.key}>{keyObj.key}</div>
                    ))}
                    <div className="keyboard-button bg-[#818384] 
                    hover:bg-[#525455] text-base font-bold p-[0.8rem] 
                    my-1 cursor-pointer uppercase select-none rounded-[3px] 
                    transition-all duration-300" onClick={() => delLetter()}>
                    DEL
                    </div>
                </div>
            </div>
        </>
    )
}