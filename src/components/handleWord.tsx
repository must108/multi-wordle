import { useState, useEffect } from 'react'
import getAllWords from '../routes/getWord'

export default function Words() {
    const [wordArray, setWordArray] = useState<string[]>([]);
    const [wordType, setWordType] = useState("");

    useEffect(() => {
        async function fetchWords() {
            try {
                const words = await getAllWords(wordType);
                setWordArray(words);
            } catch (error) {
                console.error('error fetching words: ', error);
            }
        }

        const handleWordType = (e: CustomEvent) => {
            const wordType: string = e.detail.wordType;
            setWordType(wordType);
        }

        window.addEventListener('modeSelect', handleWordType as EventListener);

        fetchWords();

        return () => {
            window.removeEventListener('modeSelect', handleWordType as EventListener);
        }
    }, [wordType]);

    return wordArray;
}
