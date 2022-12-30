import React, { useEffect, useState } from "react";
import YoutubeBackground, { YouTubeProps } from "react-youtube";
import movieTrailer from "movie-trailer";
import { LineWave } from "react-loader-spinner";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ModalPlayer(props) {
  const [modal, setModal] = props.modal;
  const activeVideo = modal.activeVideo;

  const [trailerID, setTrailerID] = useState("");
  const [loadingState, setloadingState] = useState(0);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 1,
    },
  };

  // Set active trailer whenever the activeVideo is set
  useEffect(() => {
    if (!activeVideo)
      return;

    const fetchMovieTrailer = async (activeVideo) => {
      setloadingState(0);

      movieTrailer(
        activeVideo?.name ||
        activeVideo?.title ||
        activeVideo?.original_name ||
        ""
      ).then((youtubeLink) => {
        if (youtubeLink) {
          setTrailerID(youtubeLink.split("v=")[1]);
          setloadingState(1);
        } else {
          setloadingState(2);
          setTrailerID(null);
        }
      });
    };

    activeVideo && fetchMovieTrailer(activeVideo);
  }, [activeVideo]);

  return (
    <>
      <Modal
        open={modal.isOpen}
        center
        showCloseIcon={true}
        animationDuration={1000}
        onClose={() => {
          setModal(prev => ({ activeVideo: null, isOpen: false }));
        }}
        classNames={{
          modal: "h-screen w-screen [&>.close-btn]:hover:visible !max-w-none !m-0 !p-0 !bg-transparent",
          closeButton: "invisible z-[999] !right-[20px] !bg-black bg-opacity-80 transition-all duration-500 !shadow-xl hover:!bg-white hover:fill-black rounded-full !p-3 fill-white text-white"
        }}
      >
        {loadingState === 0 && (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <LineWave
              height="300"
              width="300"
              color="#e50914"
              ariaLabel="line-wave"
              wrapperStyle={{}}
              wrapperclassName=""
              visible={true}
              firstLineColor=""
              middleLineColor=""
              lastLineColor=""
            />
          </div>
        )}

        {loadingState === 1 && (
          <YoutubeBackground
            videoId={activeVideo && trailerID ? trailerID : null}
            opts={opts}
            style={{ height: "100vh" }}
            onReady={() => setloadingState(1)}
          />
        )}

        {loadingState === 2 && (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl font-medium text-white">
              This video is not available.
            </h1>
          </div>
        )}
      </Modal>
    </>
  );
}
