import React, { useEffect, useState } from "react";
import * as TMDB from '../includes/tmdb'
import { LineWave } from "react-loader-spinner";
import { basePath } from "../tmdb"
import ImagePlaceholder from "../images/placeholder.jpeg";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ModalVideoInformation(props) {
  const [modal, setModal] = props.modal;
  const activeVideo = modal.activeVideo;
  const videoType = modal.videoType;

  const [loadingState, setloadingState] = useState(0);
  const [videoDetails, setVvideoDetails] = useState(null);

  const bannerImage = activeVideo && activeVideo.backdrop_path && (basePath + activeVideo.backdrop_path);

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false, videoType: '' }));
  }

  const [open, setOpen] = useState(false);

  // Fetch genres
  useEffect(() => {
    // Set active loadingstate on succesfull movie fetch
    if (activeVideo) {
      setloadingState(1)
    } else {
      setloadingState(3);
      return
    }

    // Fetch movie details
    (async () => {
      const genres = await TMDB.getGenresNames(videoType, activeVideo);

      let details = [
        {
          title: "Original title",
          value: activeVideo.original_title || activeVideo.original_name
        },
        {
          title: "Genres",
          value: genres && genres.join(",")
        },
        {
          title: "Release date",
          value: activeVideo.release_date || activeVideo.first_air_date
        },
        {
          title: "Rating",
          value: `${Math.floor(activeVideo.vote_average)}/10`
        },
      ]

      setVvideoDetails(details);
    })();
  }, [activeVideo])

  return (
    <>
      <style>
        {`
            @keyframes slide-in-bottom {
              0% {
                  transform: translateY(100%);
                  -webkit-transform: translateY(100%);
                  opacity: 0;
              }
          
              100% {
                  transform: translateY(0);
                  -webkit-transform: translateY(0);
                  opacity: 100%;
              }
          }
          
          @keyframes slide-out-bottom {
              0% {
                  transform: translateY(0);
                  -webkit-transform: translateY(0);
                  animation-fill-mode: forwards
              }

              50% {
                opacity: 50%;
              }
          
              90% {
                display: none;
                opacity 0 !important;
              }

              100% {
                  transform: translateY(100%);
                  -webkit-transform: translateY(100%);
                  opacity: 0;
                  visibility: hidden;
                  animation-fill-mode: forwards
              }
          }
        `}
      </style>

      <Modal
        open={modal.isOpen}
        center
        showCloseIcon={true}
        animationDuration={1000}
        onEscKeyDown={() => closeModal()}
        onOverlayClick={() => closeModal()}
        onClose={() => closeModal()}
        closeIcon={
          <svg width="19" height="19" viewBox="0 0 36 36" data-testid="close-icon"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path></svg>
        }
        classNames={{
          root: "[&>.react-responsive-modal-container]:scrollbar-hide",
          overlay: "![animation-fill-mode:forwards]",
          modal: "!bg-white ![animation-fill-mode:forwards] !rounded-md !bg-light-dark !p-0 min-w-[300px] !max-w-[650px] min-h-[400px] !overflow-visible !shadow-lg !shadow-dark",
          closeButton: "close-btn z-[999] !top-0 !right-0 m-6 !bg-black bg-opacity-80 transition-all duration-500 !shadow-lg hover:!bg-white hover:fill-black rounded-full !p-1 fill-white text-white border-white border-1",
          modalAnimationIn: "slide-in-bottom",
          modalAnimationOut: "slide-out-bottom",
        }
        }
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

        {loadingState === 1 && activeVideo && (
          <div className="video-information">
            <div className="banner relative">
              <img src={bannerImage ? bannerImage : ImagePlaceholder} alt="banner" className="w-full rounded-md" />
              <div className="banner_fadeBottom absolute bottom-0 bg-gradient-to-b h-40 from-transparent via-dark to-dark w-full" />
            </div>

            <div className="video-information__box relative max-h-[450px] overflow-auto scrollbar-hide z-10 px-8 pb-10 -mt-10">
              <h2 className="text-3xl text-white">{activeVideo?.title || activeVideo?.name}</h2>

              <p className="text-lg text-white mt-5 font-extralight">{activeVideo?.overview}</p>

              <hr className="my-6 h-px bg-white bg-opacity-10 border-0" />

              <h3 className="text-2xl font-medium text-white">
                <span className="font-normal text-light-gray">Information about</span> {activeVideo?.title || activeVideo?.name}</h3>

              {videoDetails &&
                <ul className="video-information__details mt-6">
                  {videoDetails.map((detail, index) => (
                    <li className="video-information__details__item flex" key={index}>
                      <span className="text-light-gray min-w-[150px]">{detail.title}</span>
                      <span className="text-white">{detail.value}</span>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
        )}

        {loadingState === 2 && (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl font-medium text-white">
              Information about this video is not available.
            </h1>
          </div>
        )}
      </Modal>
    </>
  );
}
