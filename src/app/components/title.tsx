"use client";

export default function Title() {

    const toggleTitle = () => {
        window.dispatchEvent(new CustomEvent('titleToggle'));
    }

    return (
        <>
            <div className="flex flex-col items-center 
                justify-center h-[95vh]">
                <h1 className="font-bold text-7xl py-5">multi-wordle</h1>
                <button className="rounded py-2 px-8 bg-gray-500 
                    hover:bg-gray-400" 
                    onClick={() => toggleTitle()}>play</button>
            </div>
        </>
    )
}