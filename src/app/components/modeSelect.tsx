"use client";

export function ModeSelect() { 

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
            <h1 className="font-bold text-5xl py-5 text-center">choose your gamemode:</h1>
            <div className="flex gap-[10px]">
                <button className="rounded py-1 px-2 
                    bg-gray-500 hover:bg-gray-400" 
                    onClick={() => handleMode('four')}>four</button>
                <button className="rounded py-1 px-2 bg-gray-500 
                    hover:bg-gray-400" 
                    onClick={() => handleMode('five')}>five</button>
                <button className="rounded py-1 px-2 
                    bg-gray-500 hover:bg-gray-400" 
                    onClick={() => handleMode('six')}>six</button>
            </div>
        </div>
    );
}

