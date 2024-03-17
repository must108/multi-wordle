import { useState, useEffect } from 'react';

const NUM_GUESSES = 6;
const NUM_BOXES = 5;

export default function Board() {
    return (
        <div className="game-board">
            {[...Array(NUM_GUESSES)].map((_, index) => (
                <Row key={index} showLetter = {index === 0} />
            ))}
        </div>
    )
}

function Row({ showLetter }: any) {
    const [letter, setLetter] = useState(-1);

    useEffect(() => {
        if(showLetter) {
            const index = 0;
            setLetter(index);
        }
    }, [showLetter]);

    return (
        <div className="letter-row">
            {[...Array(NUM_BOXES)].map((_, index) => (
                <div key={index} className="letter-box">
                    {index === letter ? 'M' : null}    
                </div>
            ))}
        </div>
    );
}
