import { useState, useEffect } from 'react'
import { getWord } from '../routes/getWord'

export default function Words() {
    const [word, setWord] = useState("");

    useEffect(() => {
        async function fetchWord() {
            try {
                const res = await getWord();
                setWord(res);
            } catch (error) {
                console.error('error fetching word: ', error);
            }
        }
        fetchWord();
    }, []);

    return (
        <>
            <h1>Word:</h1>
            <h1>{word}</h1>
        </>
    )
}