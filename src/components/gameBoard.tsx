import { useState, useEffect, useRef } from 'react';

const NUM_GUESSES = 6;
const NUM_BOXES = 5;

export default function Board() {
    const [active, setActive] = useState(1);
    const activeRef = useRef(active);

    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    useEffect(() => {
        const handleEnter = (e: CustomEvent) => {
            setActive(prevActive => prevActive + 1);
        };

        window.addEventListener('enterPressed', handleEnter as EventListener);

        return () => {
            window.removeEventListener('enterPressed', handleEnter as EventListener);
        }
    }, []);

    return (
        <div className="game-board">
            <Row isActive={activeRef.current === 1} />
            <Row isActive={activeRef.current === 2} />
            <Row isActive={activeRef.current === 3} />
            <Row isActive={activeRef.current === 4} />
            <Row isActive={activeRef.current === 5} />
            <Row isActive={activeRef.current === 6} />
        </div>
    )
}

function Row({ isActive }: any) {
    const [letters, setLetters] = useState<string[]>([]);
    const [indexInRow, setIndexInRow] = useState(0);

    useEffect(() => {
        if(isActive) {
            const handleLetter = (e: CustomEvent) => {
                if(letters.length <= 4) {
                    const newLetter = e.detail.letter;
                    setLetters(prevLetters => [...prevLetters, newLetter]);
                    setIndexInRow(prevIndex => prevIndex + 1);
                }
            };
    
            const handleKeyboardLetter = (event: KeyboardEvent) => {
                const newLetter = event.key;
                if(newLetter.length === 1 && newLetter.match(/[a-z]/gi) && letters.length <= 4) {
                    setLetters(prevLetters => [...prevLetters, newLetter]);
                    setIndexInRow(prevIndex => prevIndex + 1);
                }
            };
    
            const delLetter = () => {
                if(letters.length > 0) {
                    setLetters(prevLetters => prevLetters.slice(0, -1));
                    setIndexInRow(prevIndex => Math.max(prevIndex - 1, 0));
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
    }, [letters]);

        return (
            <div className="letter-row">
                {[...Array(NUM_BOXES)].map((_, i) => (
                    <div key={i} className="letter-box">{letters[i]}</div>
                ))}
            </div>
        );
}