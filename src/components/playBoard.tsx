import Board from "./gameBoard";
import Keyboard from "./keyBoard";
import keys from "../data/keys";
import React from 'react';

export default function PlayBoard() {
    return (
        <>
            <Board />
            <Keyboard keys={keys} />
        </>
    )
}