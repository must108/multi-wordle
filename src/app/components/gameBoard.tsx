"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Words } from './handleWord';

const NUM_GUESSES = 6;
let NUM_BOXES: number;
let WORD_SIZE: number;
let RANDOM_NUMBER: number;
let currRow: number = 0;

export default function Board() {
    const [active, setActive] = useState(1);
    const activeRef = useRef(active);


    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    useEffect(() => {
        const handleEnter = () => {
            setActive(prevActive => Math.min(prevActive + 1, NUM_GUESSES));
            activeRef.current = activeRef.current + 1;
        };

        window.addEventListener('sendEnter', handleEnter as EventListener);

        return () => {
            window.removeEventListener('sendEnter', handleEnter as EventListener);
        }
    }, []);

    return (
        <>
            <div className="game-board flex flex-col items-center">
                {[...Array(NUM_GUESSES)].map((_, i) => (
                    <Row key={i} isActive={activeRef.current === i + 1} />
                ))}
            </div>
        </>
    )
} // creates the "board" for typing words

function Row({ isActive }: any) {
    const [letters, setLetters] = useState<string[]>([]);
    let wordArr: string[] = Words()!.map(word => word.toLowerCase());
    let submitWord: string = "";
    const correctWord = wordArr[RANDOM_NUMBER];

    useEffect(() => {
        if(isActive) {
            const handleLetter = (e: CustomEvent) => {
                if(letters.length <= 4) {
                    const newLetter = e.detail.letter;
                    setLetters(prevLetters => [...prevLetters, newLetter]);
                }
            };
    
            const handleKeyboardLetter = (event: KeyboardEvent) => {
                const newLetter = event.key;
                if(newLetter.length === 1 && newLetter.match(/[a-z]/gi) && letters.length <= (NUM_BOXES - 1)) {
                    setLetters(prevLetters => [...prevLetters, newLetter]);
                }
            };
    
            const delLetter = () => {
                if(letters.length > 0) {
                    setLetters(prevLetters => prevLetters.slice(0, -1));
                }
            }
    
            const backSpace = (e: KeyboardEvent) => {
                if(e.key === 'Backspace') {
                    e.preventDefault();
                    delLetter();
                }
            }

            const sendEnter = (e: CustomEvent) => {
                if(letters.length > (NUM_BOXES - 1)) {
                    inputValid(submitWord, letters, wordArr, correctWord, lettersRef);
                } else {
                    const message = 'Not enough letters'
                    const event = new CustomEvent('wordCheck', {
                        detail: { message } 
                    });
                    
                    window.dispatchEvent(event);
                }
            }

            const sendEnterKey = (e: KeyboardEvent) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    if(letters.length > (NUM_BOXES - 1)) {
                        inputValid(submitWord, letters, wordArr, correctWord, lettersRef);
                    } else {
                        const message = 'Not enough letters'
                        const event = new CustomEvent('wordCheck', {
                            detail: { message } 
                        });
                            
                        window.dispatchEvent(event);
                    }
                }
            } // handles submission of word for input validation
    
            window.addEventListener('letterSent', handleLetter as EventListener);
            window.addEventListener('deleteLetter', delLetter as EventListener);
            window.addEventListener('keydown', handleKeyboardLetter);
            window.addEventListener('keydown', backSpace);
            window.addEventListener('enterPressed', sendEnter as EventListener);
            window.addEventListener('keyup', sendEnterKey as EventListener);
    
            return () => {
                window.removeEventListener('letterSent', handleLetter as EventListener);
                window.removeEventListener('deleteLetter', delLetter as EventListener);
                window.removeEventListener('keydown', handleKeyboardLetter);
                window.removeEventListener('keydown', backSpace);
                window.removeEventListener('enterPressed', sendEnter as EventListener);
                window.removeEventListener('keyup', sendEnterKey as EventListener);
            };
        }
    }, [letters, isActive]);

    const lettersRef = useRef<(HTMLDivElement | null)[]>([]);

        return (
            <>
                <div className="letter-row flex">
                    {[...Array(NUM_BOXES)].map((_, i) => (
                        <div key={i} 
                        ref={(ref) => {
                            if(ref) {
                                lettersRef.current[i] = ref as HTMLDivElement;
                            }
                        }} 
                        className="letter-box flex uppercase items-center justify-center select-none h-[3.5rem] w-[3.5rem] font-bold text-[1.9rem] m-[2px] rounded-[3px] border-2 border-solid border-[#333333]">{letters[i]}</div>
                    ))}
                </div>
            </>
        );
} // handles creation of row and input validation

function inputValid(submitWord: string, letters: string[], wordArr: string[], correctWord: string, 
    lettersRef: React.MutableRefObject<(HTMLDivElement | null)[]>) {

    submitWord = letters.join('');
    if(wordArr.includes(submitWord)) {
        const event = new CustomEvent('sendEnter');

        window.dispatchEvent(event);
        if(submitWord === correctWord) {
            const message = 'Correct Guess'
            const event = new CustomEvent('wordCheck', {
                detail: { message }
            });

            window.dispatchEvent(event);
            colorLetters(correctWord, submitWord, lettersRef);
        } else {
            if (currRow === NUM_BOXES - 1) {
                const message = 'Wrong Answer'
                const word = correctWord
                const event = new CustomEvent('wordCheck', {
                    detail: { message, word }
                });

                window.dispatchEvent(event);
                colorLetters(correctWord, submitWord, lettersRef);
            } else {
                const message = 'Wrong Guess'
                const event = new CustomEvent('wordCheck', {
                    detail: { message } 
                });

                window.dispatchEvent(event);
                colorLetters(correctWord, submitWord, lettersRef);
            }
        }
        currRow += 1;
    } else {
        const message = 'Not a word';
        const event = new CustomEvent('wordCheck', {
            detail: { message }
        });

        window.dispatchEvent(event);
    }
} // main function for input validation of words.

function colorLetters(correctWord: string, submitWord: string, 
    lettersRef: React.MutableRefObject<(HTMLDivElement | null)[]>) {

    for(let i = 0; i < NUM_BOXES; i++) {
        const elem = lettersRef.current[i];
        if(correctWord[i] === submitWord[i]) {
            elem!.classList.add('correctLetter', 'bg-[#333333]', 'text-green-700');
        } else if(correctWord.includes(submitWord[i])) {
            elem!.classList.add('containsLetter', 'bg-[#333333]', 'text-yellow-300');
        } else if(!correctWord.includes(submitWord[i]) && 
        correctWord[i] !== submitWord[i]) {
            const letter = elem!.textContent;
            elem!.classList.add('wrongLetter', 'bg-[#333333]');

            const event = new CustomEvent('fadeLetter', {
                detail: { letter }
            });
            window.dispatchEvent(event);
        }
    }
} // to color letters as right

const handleMode = (e: CustomEvent) => {
    let len = e.detail.length;
    let size = e.detail.size;

    NUM_BOXES = len;
    WORD_SIZE = size;
    RANDOM_NUMBER = randNum(WORD_SIZE);
    const event = new CustomEvent('gameToggle');
    window.dispatchEvent(event);
};

function randNum(max: number) {
    return Math.floor(Math.random() * max) + 1;
}


if (typeof window !== 'undefined') {
    window.addEventListener('modeSelect', handleMode as EventListener);
}