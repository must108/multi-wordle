
export default function ModeSelect() { 

    const handleMode = (mode: string) => {
        let length, size;
        if(mode === 'four') {
            length = 4;
            size = 3111;
            const event = new CustomEvent('modeSelect', {
                detail: { length, size }
            });
            window.dispatchEvent(event);
        } else if(mode === 'five') {
            length = 5;
            size = 2315;
            const event = new CustomEvent('modeSelect', {
                detail: { length, size }
            });
            window.dispatchEvent(event);
        } else if(mode === 'six') {
            length = 6;
            size = 2487;
            const event = new CustomEvent('modeSelect', {
                detail: { length, size }
            });
            window.dispatchEvent(event);
        }
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

