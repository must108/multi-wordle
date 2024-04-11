let wordType: string = ""

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
                size = 2315;
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

        const event = new CustomEvent('modeSelect', {
            detail: { length, size, wordType }
        });
        window.dispatchEvent(event);
    }

    return (
        <div id="modeContainer">
        <h1>choose your gamemode:</h1>
        <div id="modeButtonContainer">
            <button onClick={() => handleMode('four')}>four</button>
            <button onClick={() => handleMode('five')}>five</button>
            <button onClick={() => handleMode('six')}>six</button>
        </div>
        </div>
    );
}

