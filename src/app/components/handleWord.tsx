"use client";

import { useState, useEffect } from 'react'

export function Words() {
    const [wordArray, setWordArray] = useState<string[] | null>([]);
    const word = useWord();

    useEffect(() => {
        async function fetchWords() {
            try {
                const res = await fetch(`/api?word=${word}`);
                if(!res.ok) {
                    throw new Error('failed to fetch data');
                }
                const data = await res.json();
                setWordArray(data);
            } catch (error) {
                console.error('error fetching words: ', error);
            }
        }
        fetchWords();
    }, []);

    return wordArray;
}

export function useWord() {
    const [word, setWord] = useState("");

    useEffect(() => {
        console.log('hello');
        const handleWordType = (e: CustomEvent) => {
            console.log('event heard');
            const wordType: string = e.detail.wordType;
            setWord(wordType);
        }

        window.addEventListener('modeSelect', handleWordType as EventListener);

        return () => {
            window.removeEventListener('modeSelect', handleWordType as EventListener);
        }
    }, []);

    return word;
}