import { useState, useEffect } from "react";

export default function EndingModal() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleModal = (e: CustomEvent) => {
        const endMessage = e.detail.endMessage;

        if(endMessage === 'Correct') {
            setTitle("you guessed correctly!");
            setBody("click below to play again!");
        } else if(endMessage === 'Incorrect') {
            const word = e.detail.word;
            setTitle("you didn't get it!")
            setBody("the word was " + word + ". click below to" + 
            " play again!");
        }

        setShowModal(true);
    }

    useEffect(() => {
        window.addEventListener('endModal', handleModal as EventListener);

        return () => {
            window.removeEventListener('endModal', handleModal as EventListener);
        }
    }, []);

    const handleMenuBack = () => {
        window.dispatchEvent(new CustomEvent("showTitle"));
        window.dispatchEvent(new CustomEvent("modeSelectAgain"));
        setShowModal(false);
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-3/4 sm:w-1/2 md:w-1/4 my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#333333] outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex justify-center p-4 rounded-t">
                            <h3 className="text-3xl text-center font-semibold text-white">
                                {title}
                            </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <p className="my-4 text-center text-lg leading-relaxed text-white">
                                {body}
                            </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-center p-6 gap-3 rounded-b">
                                <button
                                    className="font-bold text-white bg-carolina-blue py-2 
                                    px-4 rounded-md outline-none focus:outline-none
                                    hover:bg-hover-carol-blue transition-colors delay-50"
                                    type="button"
                                    onClick={() => handleMenuBack()}
                                >
                                    again
                                </button>
                                <button>

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