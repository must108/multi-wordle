import React, { useState, useEffect } from 'react'
import { getWord } from '../routes/getWord'

let word = "";

export default function Words() {
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
