import React from 'react'
import { ReactSVG } from 'react-svg'

function CardControls({ video, modals, videoType }) {
    const [playVideoModal, setplayVideoModal] = modals.playVideoModal;
    const [informationModalModal, setInformationModal] = modals.informationModal;

    return (
        <div className="flex controls justify-between transition-all duration-300 align-center mb-1">
            <div className="left flex space-x-1">
                <button className="rounded-full hover:border-white transition-all duration-200 text-black bg-white hover:bg-opacity-80 p-1 w-6 h-6 flex align-center items-center justify-center border border-lighter-gray relative"
                    onClick={() => {
                        setplayVideoModal({ activeVideo: video, isOpen: true });
                    }}
                >
                    <ReactSVG src="/images/icons/play.svg" alt="Play" className="w-2 h-2" />
                </button>

                <button className="rounded-full hover:border-white transition-all duration-200 text-white hover:bg-white hover:text-black p-1 w-6 h-6 flex align-center items-center justify-center border border-lighter-gray relative">
                    <ReactSVG src="/images/icons/plus.svg" alt="Add to list" className="w-2 h-2" />
                </button>

                <button className="rounded-full hover:border-white transition-all duration-200 text-white hover:bg-white hover:text-black p-1 w-6 h-6 flex align-center items-center justify-center border border-lighter-gray relative">
                    <ReactSVG src="/images/icons/thumbs-up.svg" alt="Like" className="w-2 h-2" />
                </button>

                <button className="rounded-full hover:border-white transition-all duration-200 text-white hover:bg-white hover:text-black p-1 w-6 h-6 flex align-center items-center justify-center border border-lighter-gray relative">
                    <ReactSVG src="/images/icons/thumbs-down.svg" alt="Dislike" className="w-2 h-2" />
                </button>
            </div>

            <div className="ml-auto">
                <button className="rounded-full hover:border-white transition-all duration-200 text-white hover:bg-white hover:text-black p-1 w-6 h-6 flex align-center items-center justify-center border border-lighter-gray relative"
                    onClick={() => {
                        setInformationModal({ activeVideo: video, isOpen: true, videoType: videoType });
                    }}
                >
                    <ReactSVG src="/images/icons/chevron-down.svg" alt="Read More" className="w-2 h-2" />
                </button>
            </div>
        </div>
    )
}

export default CardControls