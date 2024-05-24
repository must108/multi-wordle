"use client";

import Board from "./gameBoard";
import Keyboard from "./keyBoard";
import keys from "../keys";
import React, { useState, useEffect } from 'react';

export default function PlayBoard() {
    const [message, setMessage] = useState("");
    const [opacity, setOpacity] = useState("0");

    useEffect(() => {
        const handleNotWord = (e: CustomEvent) => {
            const check = e.detail.message;
            if(check === 'Correct Guess') {
                setMessage('You made the correct guess!');
                window.dispatchEvent(new CustomEvent("finished"));
                setOpacity("100");
            } else if(check === 'Wrong Guess') { 
                // typically only changes UI, might add some event later
                // placeholder in-case
            } else if(check === 'Not a word') { 
                setMessage('Not a valid word!');
                setOpacity("100");
            } else if(check === 'Not enough letters') {
                setMessage('Not enough letters!');
                setOpacity("100");
            } else if(check === 'Wrong Answer') { 
                // if the wrong word is given on 6th att
                const word = e.detail.word.toUpperCase();
                setMessage("You didn't get it! The word is " + word + "!");
                setOpacity("100");
                window.dispatchEvent(new CustomEvent("finished"));
            }
            clearTimeout(timeoutMessage);
            clearTimeout(timeoutOpacity);

            timeoutOpacity = setTimeout(() => {
                setOpacity("0");
            }, 2500);

            timeoutMessage = setTimeout(() => {
                setMessage("");
            }, 3000);
        };

        let timeoutMessage: NodeJS.Timeout;
        let timeoutOpacity: NodeJS.Timeout;

        window.addEventListener('wordCheck', 
            handleNotWord as EventListener); 
            // event that handles input valiation

        return () => {
            window.removeEventListener('wordCheck', 
                handleNotWord as EventListener);
            clearTimeout(timeoutMessage);
            clearTimeout(timeoutOpacity);
        };
    }, []);

    return (
        <>
            <div id="gameContainer" className="
                flex flex-col items-center justify-center h-[95vh]">
                <div className={`text-center text-white p-2 bg-gray-950 
                rounded-md opacity-${opacity} transition-opacity delay-50 h-10
                font-bold`}>
                    {message}
                </div>
                <Board />
                <Keyboard keys={keys} />
            </div>
        </>
    )
}