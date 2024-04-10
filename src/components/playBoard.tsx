import Board from "./gameBoard";
import Keyboard from "./keyBoard";
import keys from "../data/keys";
import React, { useState, useEffect } from 'react';

export default function PlayBoard() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleNotWord = (e: CustomEvent) => {
            const check = e.detail.message;
            if(check === 'Correct Guess') {
                setMessage('You made the correct guess!');
            } else if(check === 'Wrong Guess') {
                // placeholder in-case
            } else if(check === 'Not a word') {
                setMessage('Not a valid word!');
            } else if(check === 'Not enough letters') {
                setMessage('Not enough letters!')
            }
            setTimeout(() => {
                setMessage("");
            }, 2000);
        };

        window.addEventListener('wordCheck', handleNotWord as EventListener);

        return () => {
            window.removeEventListener('wordCheck', handleNotWord as EventListener);
        };
    }, []);

    return (
        <>
            <div id="gameContainer">
                <Board />
                <Keyboard keys={keys} />
                <p id="gameMessage">{message}</p>
            </div>
        </>
    )
}