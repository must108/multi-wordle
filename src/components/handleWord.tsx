import { useState, useEffect } from 'react'
import { getAllWords } from '../routes/getWord'

export function Words() {
    const [wordArray, setWordArray] = useState<string[]>([]);

    useEffect(() => {
        async function fetchWords() {
            try {
                const words = await getAllWords();
                setWordArray(words);
            } catch (error) {
                console.error('error fetching words: ', error);
            }
        }
        fetchWords();
    }, []);

    return wordArray;
}
