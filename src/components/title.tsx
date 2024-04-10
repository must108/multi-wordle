
export default function Title() {

    const toggleTitle = () => {
        const event = new CustomEvent('titleToggle');
        window.dispatchEvent(event);
    }

    return (
        <>
            <div id="titleContainer">
                <h1>multi-wordle</h1>
                <button onClick={() => toggleTitle()}>play</button>
            </div>
        </>
    )
}