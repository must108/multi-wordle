"use client";

import Board from "./gameBoard";
import Keyboard from "./keyBoard";
import keys from "../keys";
import React, { useState, useEffect } from 'react';

export default function PlayBoard() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleNotWord = (e: CustomEvent) => {
            const check = e.detail.message;
            if(check === 'Correct Guess') {
                setMessage('You made the correct guess!');
                window.dispatchEvent(new CustomEvent("finished"));
            } else if(check === 'Wrong Guess') { 
                // typically only changes UI, might add some event later
                // placeholder in-case
            } else if(check === 'Not a word') { 
                setMessage('Not a valid word!');
            } else if(check === 'Not enough letters') {
                setMessage('Not enough letters!')
            } else if(check === 'Wrong Answer') { 
                // if the wrong word is given on 6th att
                const word = e.detail.word.toUpperCase();
                setMessage("You didn't get it! The word is " + word + "!");
                window.dispatchEvent(new CustomEvent("finished"));
            }
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setMessage("");
            }, 3000);
        };

        let timeoutId: NodeJS.Timeout;

        window.addEventListener('wordCheck', 
            handleNotWord as EventListener); 
            // event that handles input valiation

        return () => {
            window.removeEventListener('wordCheck', 
                handleNotWord as EventListener);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <div id="gameContainer" className="
                flex flex-col items-center justify-center h-[95vh]">
                <Board />
                <Keyboard keys={keys} />
                <p className="text-center text-white">{message}</p>
            </div>
        </>
    )
}