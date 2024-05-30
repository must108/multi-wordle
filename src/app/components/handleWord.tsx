"use client";

import { useState, useEffect } from 'react'

export function Words() {
    const [fourLetterArray, setFourLetterArray] = 
        useState<string[] | null>([]);
    const [fiveLetterArray, setFiveLetterArray] = 
        useState<string[] | null>([]);
    const [sixLetterArray, setSixLetterArray] = useState<string[] | null>([]);

    useEffect(() => {

        async function fetchWords() {
            try {
                const resFour = await fetch(`https://multi-wordle-server-8e1b459f5b88.herokuapp.com/api/words?word=fourletter`);
                const resFive = await fetch(`https://multi-wordle-server-8e1b459f5b88.herokuapp.com/api/words?word=fiveletter`);
                const resSix = await fetch(`https://multi-wordle-server-8e1b459f5b88.herokuapp.com/api/words?word=sixletter`);
                if(!resFour.ok || !resFive.ok || !resSix.ok) {
                    throw new Error('failed to fetch data');
                }
                const fourData = await resFour.json();
                const fiveData = await resFive.json();
                const sixData = await resSix.json();
                setFourLetterArray(fourData);
                setFiveLetterArray(fiveData);
                setSixLetterArray(sixData);
            } catch (error) {
                console.error('error fetching words: ', error);
            }
        }

        fetchWords();
    }, []);

    return [fourLetterArray, fiveLetterArray, sixLetterArray];
}

function useWord() {
    const [word, setWord] = useState("");

    useEffect(() => {
        const handleWordType = (e: CustomEvent) => {
            console.log('event heard');
            const wordType = e.detail.wordType;
            setWord(wordType);
        }

        window.addEventListener('modeSelect', 
        handleWordType as EventListener);

        return () => {
            window.removeEventListener('modeSelect', 
            handleWordType as EventListener);
        }
    }, []);

    return word;
}