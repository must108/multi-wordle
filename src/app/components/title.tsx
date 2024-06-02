/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { title } from "process";
import { useState, useEffect } from "react";

export default function Title() {
    const [titleOpacity, setTitleOpacity] = useState("opacity-0");
    const [buttonOpacity, setButtonOpacity] = useState("opacity-0");

    useEffect(() => {
        clearTimeout(titleTimeout);
        clearTimeout(buttonTimeout);

        titleTimeout = setTimeout(() => {
            setTitleOpacity("opacity-100");
        }, 700);

        buttonTimeout = setTimeout(() => {
            setButtonOpacity("opacity-100");
        }, 1400);
    });

    let titleTimeout: NodeJS.Timeout;
    let buttonTimeout: NodeJS.Timeout;

    const toggleTitle = () => {
        window.dispatchEvent(new CustomEvent('titleToggle'));
    }

    return (
        <>
            <div className="flex flex-col items-center h-[100vh]">
                <div className="flex flex-col items-center 
                    justify-center h-[95vh]">
                    <h1 className={`font-bold text-6xl sm:text-7xl py-5 
                    ${titleOpacity} transition-opacity delay-300`}
                    >multi-wordle</h1>
                    <div className={`${buttonOpacity} transition-opacity 
                    delay-300`}
                    >
                        <button className={`font-bold text-white 
                        bg-carolina-blue py-2 px-4 rounded-md 
                        outline-none focus:outline-none
                        hover:bg-hover-carol-blue 
                        transition-colors delay-50` }
                        onClick={() => toggleTitle()}
                        >play</button>
                    </div>
                </div>
                <p className="text-xs mt-auto
                font-bold text-[#3b3b3b]">built by <a 
                href="https://github.com/must108"
                target="_blank"
                className="hover:underline"
                    >
                        must
                    </a>
                </p>
            </div>
        </>
    )
}