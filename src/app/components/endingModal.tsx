import { useState, useEffect } from "react";

export default function EndingModal() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleModal = (e: CustomEvent) => {
        const endMessage = e.detail.endMessage;

        if(endMessage === 'Correct') {
            setTitle("You guessed correctly!");
            setBody("Choose below to return to the menu, play again, " +
            "or choose a different gamemode!");
        } else if(endMessage === 'Incorrect') {
            const word = e.detail.word;
            setTitle("You didn't get it!")
            setBody("The word was " + word + ". Choose below to" + 
            " return to the menu, play again, " +
            "or choose a different gamemode!");
        }

        setShowModal(true);
    }

    useEffect(() => {
        window.addEventListener('endModal', handleModal as EventListener);

        return () => {
            window.removeEventListener('endModal', handleModal as EventListener);
        }
    }, []);

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#333333] outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex text-center p-4 rounded-t">
                            <h3 className="text-3xl font-semibold text-white">
                                {title}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                &times;
                                </span>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <p className="my-4 text-center text-lg leading-relaxed text-white">
                                {body}
                            </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Save Changes
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}