import { useState, useEffect } from 'react'
import { getAllWords } from '../routes/getWord'


// function Words() {
//     const [word, setWord] = useState("");

//     useEffect(() => {
//         async function fetchWord() {
//             try {
//                 const res = await getWord();
//                 setWord(res.toLowerCase());
//             } catch (error) {
//                 console.error('error fetching word: ', error);
//             }
//         }
//             fetchWord();
//     }, []);


//     return word;
// }


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
