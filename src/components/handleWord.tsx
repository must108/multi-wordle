import React, { useState, useEffect } from 'react'
import { getWord, getAllWords } from '../routes/getWord'

let word = "";
let words: string[] = [];

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
    const [retWords, setWords] = useState([]);

    useEffect(() => {
        async function fetchWords() {
            try {
                const res = await getAllWords();
                setWords(res);
            } catch (error) {
                console.error('error fetching word: ', error);
            }
        }
        fetchWords();
    }, []);

    return retWords;
} // ! THIS FUNCTION MIGHT NOT WORK!