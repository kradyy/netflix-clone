import React, { useEffect } from "react";
import YoutubeBackground, { YouTubeProps } from "react-youtube";
import movieTrailer from "movie-trailer";
import { Modal } from "react-morphing-modal";
import { LineWave } from "react-loader-spinner";
import "react-morphing-modal/dist/ReactMorphingModal.css";

export default function Player({ modal, activeMovie }) {
  const { modalProps } = modal;

  const [trailerID, setTrailerID] = React.useState("");
  const [playerState, setPlayerState] = React.useState("");

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

  // Set active trailer whenever the activeMovie is set
  useEffect(() => {
    const fetchMovieTrailer = async (activeMovie) => {
      setPlayerState(0);

      movieTrailer(
        activeMovie?.name ||
          activeMovie?.title ||
          activeMovie?.original_name ||
          ""
      ).then((youtubeLink) => {
        if (youtubeLink) {
          setTrailerID(youtubeLink.split("v=")[1]);
          setPlayerState(1);
        } else {
          setPlayerState(2);
          setTrailerID(null);
        }
      });
    };

    activeMovie && fetchMovieTrailer(activeMovie);
  }, [activeMovie]);

  return (
    <>
      <Modal {...modalProps} padding={false}>
        <div className="player h-full bg-dark">
          {playerState === 0 && (
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

          {playerState === 1 && (
            <YoutubeBackground
              videoId={activeMovie && trailerID ? trailerID : null}
              opts={opts}
              style={{ height: "100vh" }}
              onReady={() => setPlayerState(1)}
            />
          )}

          {playerState === 2 && (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <h1 className="text-4xl font-medium text-white">
                This video is not available.
              </h1>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
