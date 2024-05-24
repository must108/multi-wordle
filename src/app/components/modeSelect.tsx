/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";

export function ModeSelect() { 
    const [titleOpacity, setTitleOpacity] = useState("opacity-0");
    const [fourButtonOpacity, setFourButtonOpacity] = useState("opacity-0");
    const [fiveButtonOpacity, setFiveButtonOpacity] = useState("opacity-0");
    const [sixButtonOpacity, setSixButtonOpacity] = useState("opacity-0");

    useEffect(() => {
        clearTimeout(titleTimeout);
        clearTimeout(fourButtonTimeout);
        clearTimeout(fiveButtonTimeout);
        clearTimeout(sixButtonTimeout);

        titleTimeout = setTimeout(() => {
            setTitleOpacity("opacity-100");
        }, 700);

        fourButtonTimeout = setTimeout(() => {
            setFourButtonOpacity("opacity-100");
        }, 1400);

        fiveButtonTimeout = setTimeout(() => {
            setFiveButtonOpacity("opacity-100");
        }, 2100);

        sixButtonTimeout = setTimeout(() => {
            setSixButtonOpacity("opacity-100");
        }, 2800);

    }, []);

    let titleTimeout: NodeJS.Timeout;
    let fourButtonTimeout: NodeJS.Timeout;
    let fiveButtonTimeout: NodeJS.Timeout;
    let sixButtonTimeout: NodeJS.Timeout;

    const handleMode = (mode: string) => {
        let length, size, wordType;
        switch(mode) {
            case 'four':
                length = 4;
                size = 3111;
                wordType = 'fourletter';
                break;
            case 'five':
                length = 5;
                size = 5782;
                wordType = 'fiveletter';
                break;
            case 'six':
                length = 6;
                size = 2487;
                wordType = 'sixletter';
                break;
            default:
                return;
        }

        window.dispatchEvent(new CustomEvent('modeSelect', {
            detail: { length, size, wordType }
        }));
    }

    return (
        <div className="flex flex-col items-center justify-center h-[95vh]">
            <h1 className={`font-bold text-5xl py-5 text-center ${titleOpacity}
            transition-opacity delay-300`}>choose your gamemode:</h1>
            <div className="flex gap-[10px]">
            <div className={`${fourButtonOpacity} 
            transition-opacity delay-300`}>
                <button className={`font-bold text-white bg-carolina-blue py-2 
                        px-4 rounded-md outline-none focus:outline-none
                        hover:bg-hover-carol-blue transition-colors delay-50`} 
                    onClick={() => handleMode('four')}>four</button>
            </div>
        <div className={`${fiveButtonOpacity} 
            transition-opacity delay-300`}>
            <button className={`font-bold text-white bg-carolina-blue py-2 
                        px-4 rounded-md outline-none focus:outline-none
                        hover:bg-hover-carol-blue transition-colors delay-50`}
                    onClick={() => handleMode('five')}>five</button>
        </div>
        <div className={`${sixButtonOpacity} transition-opacity
        delay-300`}>
            <button className={`font-bold text-white bg-carolina-blue py-2 
                        px-4 rounded-md outline-none focus:outline-none
                        hover:bg-hover-carol-blue transition-colors delay-50`} 
                    onClick={() => handleMode('six')}>six</button>
        </div>
            </div>
        </div>
    );
}

