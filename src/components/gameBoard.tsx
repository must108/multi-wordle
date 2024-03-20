import React, { useState, useEffect, useRef } from 'react';
import { Words, WordArray } from './handleWord';

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

        window.addEventListener('sendEnter', handleEnter as EventListener);

        return () => {
            window.removeEventListener('sendEnter', handleEnter as EventListener);
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

            const sendEnter = () => {
                if(letters.length > (NUM_BOXES - 1)) {
                    const event = new CustomEvent('sendEnter');
                    window.dispatchEvent(event);
                }
            }

            const sendEnterKey = (e: KeyboardEvent) => {
                if(letters.length > (NUM_BOXES - 1)) {
                    if(e.key === 'Enter') {
                        const event = new CustomEvent('sendEnter');
                        window.dispatchEvent(event);
                    }
                }
            }
    
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

        return (
            <div className="letter-row">
                {[...Array(NUM_BOXES)].map((_, i) => (
                    <div key={i} className="letter-box">{letters[i]}</div>
                ))}
            </div>
        );
}
