import React, { useEffect, useState } from 'react'
import * as TMDB from '../includes/tmdb'
import { basePath } from "../tmdb";
import ImagePlaceholder from "../images/placeholder.jpeg";
import CardControls from "./CardControls";

function Card({ video, endpoint, type, setSelectedTitle, modals }) {

   const [videoInformation, setVideoInformation] = useState(null);

    // Fetch genres
    useEffect(() => {
        (async () => {
             const genres = await TMDB.getGenresNames(type, video);
             setVideoInformation(prev => ({ ...prev, genres: genres }))
        })();
    }, [])

    const cardLayoutTemplates = {
        vertical: {
            class: `row__cards-vertical group overflow-hidden relative flex-shrink-0 flex-grow-0 h-[350px] transition-all duration-1000 hover:z-10 hover:scale-y-[1.151] hover:scale-x-[1.25] hover:!mx-5 group-hover:opacity-40 hover:!opacity-100 [&>.meta]:hover:bottom-0 hover:shadow-lg rounded-xl`,
            imageType: "poster_path",
        },
        horizontal: {
            class: `row__cards-horizontal group overflow-hidden relative flex-shrink-0 flex-grow-0 h-[156px] transition-all duration-1000 hover:z-10 hover:scale-y-[1.451] hover:scale-x-[1.41] hover:!mx-5 group-hover:opacity-40 hover:!opacity-100 [&>.meta]:hover:bottom-0 hover:shadow-xl rounded`,
            imageType: "backdrop_path",
        },
    };

    const cardLayout = Object.keys(cardLayoutTemplates).includes(
        endpoint?.orientation
    )
        ? cardLayoutTemplates[endpoint?.orientation]
        : cardLayoutTemplates["horizontal"];

    const image = video[cardLayout.imageType];

    if(endpoint?.orientation === "vertical" && !image) {
        console.log(video, cardLayout.imageType)
    }

    return (
        <div className={cardLayout.class}>
            <img
                src={image ? (basePath + image) : ImagePlaceholder}
                alt={video.name}
                className="w-full h-full object-cover object-left rounded"
                onClick={() => setSelectedTitle(video)}
            />

            <div className="meta -bottom-[100%] transition-[bottom] duration-500 p-3 bg-gradient-to-b absolute from-transparent to-black w-full shadow-lg rounded">
                <CardControls video={video} setSelectedTitle={setSelectedTitle} modals={modals} />

                <div className="flex justify-between align-center">
                    <div className="left">
                        <h3 className="text-white text-lg font-semibold">
                            {video.title || video.name}
                        </h3>
                        <p className="text-lighter-gray space-x-2 text-[9px]">
                               {videoInformation && videoInformation?.genres?.length > 0 && (
                                    videoInformation.genres.map((genre, index) => (
                                        <span key={index}>
                                            {genre}
                                           
                                        </span>
                                    ))
                                )}
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Card