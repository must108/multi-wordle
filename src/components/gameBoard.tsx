import React, { useState, useEffect, useRef } from 'react';

const NUM_GUESSES = 6;
const NUM_BOXES = 5;

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

        const enterKey = (e: KeyboardEvent) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                handleEnter();
            }
        }

        window.addEventListener('enterPressed', handleEnter as EventListener);
        window.addEventListener('keyup', enterKey as EventListener);

        return () => {
            window.removeEventListener('enterPressed', handleEnter as EventListener);
            window.removeEventListener('keyup', enterKey as EventListener);
        }
    }, []);

    return (
        <div className="game-board">
            {[...Array(NUM_GUESSES)].map((_, i) => (
                <Row key={i} isActive={activeRef.current === i + 1} />
            ))}
        </div>
    )
}

function Row({ isActive }: any) {
    const [letters, setLetters] = useState<string[]>([]);

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
                if(newLetter.length === 1 && newLetter.match(/[a-z]/gi) && letters.length <= 4) {
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
    
            window.addEventListener('letterSent', handleLetter as EventListener);
            window.addEventListener('deleteLetter', delLetter as EventListener);
            window.addEventListener('keydown', handleKeyboardLetter);
            window.addEventListener('keydown', backSpace);
    
            return () => {
                window.removeEventListener('letterSent', handleLetter as EventListener);
                window.removeEventListener('deleteLetter', delLetter as EventListener);
                window.removeEventListener('keydown', handleKeyboardLetter);
                window.removeEventListener('keydown', backSpace);
            };
        }
    }, [letters, isActive]);

        return (
            <div className="letter-row">
                {[...Array(NUM_BOXES)].map((_, i) => (
                    <div key={i} className="letter-box">{letters[i]}</div>
                ))}
            </div>
        );
}