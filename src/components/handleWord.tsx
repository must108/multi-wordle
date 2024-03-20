import { useState, useEffect } from 'react'
import { getWord, getAllWords } from '../routes/getWord'

let word = "";

export function Words() {
    const [retWord, setWord] = useState("");

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

    word = retWord;
    return word;
}

export function WordArray() {
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
