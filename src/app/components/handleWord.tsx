"use client";

import { useState, useEffect } from 'react'

export function Words() {
    const [fourLetterArray, setFourLetterArray] = 
        useState<string[] | null>([]);
    const [fiveLetterArray, setFiveLetterArray] = 
        useState<string[] | null>([]);
    const [sixLetterArray, setSixLetterArray] = useState<string[] | null>([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (isFetched) return;

        async function fetchWords() {
            try {
                const [resFour, resFive, resSix] = await Promise.all([
                    fetch(process.env.NEXT_PUBLIC_FOUR_LETTER!),
                    fetch(process.env.NEXT_PUBLIC_FIVE_LETTER!),
                    fetch(process.env.NEXT_PUBLIC_SIX_LETTER!),
                ]);
                if(!resFour.ok || !resFive.ok || !resSix.ok) {
                    throw new Error('failed to fetch data');
                }
                const [fourData, fiveData, sixData] = await Promise.all([
                    resFour.json(),
                    resFive.json(),
                    resSix.json()
                ]);
                setFourLetterArray(fourData);
                setFiveLetterArray(fiveData);
                setSixLetterArray(sixData);
                setIsFetched(true);
            } catch (error) {
                console.error('error fetching words: ', error);
            }
        }

        fetchWords();
    }, [isFetched]);

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