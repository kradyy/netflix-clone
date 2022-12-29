import { useEffect } from "react";
import Banner from "../components/Banner";
import Gallery from "../components/Gallery";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { useState } from "react";
import { useModal } from 'react-morphing-modal';
import { useParams, useLocation } from "react-router-dom";
import { endpoints } from "../tmdb";

import "react-morphing-modal/dist/ReactMorphingModal.css";

const DEFAULT_LAYOUT = {
  type: "movies",
  genres: [
    "Trending",
    "NetflixOriginals",
    "TopRated",
    "Action",
    "Comedy",
    "Horror",
    "Romance",
    "Documentaries",
  ],
};

function Home() {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

  // Set up modals for video player and information
  // Oh yee, propdrilling
  const modals = {
    playVideoModal: useModal(),
    informationModal: useModal(),
  }

  const location = useLocation();
  const { category } = useParams();

  const [fadeInterval, setFadeInterval] = useState(null);

  // Scroll on selected title change
  useEffect(() => {
    if (selectedTitle) {
      window.scrollTo(0, 0);
    }
  }, [selectedTitle]);

  // Wonky fade-in effect using React State
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-switch");
    var opacity = 0;
    fadeElements.forEach(element => { element.style.opacity = "0%"; })

    clearInterval(fadeInterval);

    const interval = setInterval(() => {
      opacity += 0.2;

      fadeElements.forEach(element => {
        element.style.opacity = opacity + '%';
      });

      if (opacity >= 100) {
        clearInterval(interval);
      }
    }, 5);

    setFadeInterval(interval);

    return () => clearInterval(interval);
  }, [location]);

  // Set layout based on category
  var layout = DEFAULT_LAYOUT;

  if (category) {
    layout.type = Object.keys(endpoints).includes(category)
      ? category
      : "movies";
  }

  return (
    <div className="relative">
      <Navbar />
      <Banner
        setSelectedTitle={setSelectedTitle}
        selectedTitle={selectedTitle}
        setActiveMovie={setActiveMovie}
        modals={modals}
      />
      <Gallery setSelectedTitle={setSelectedTitle} modals={modals} layout={DEFAULT_LAYOUT} />
      <Player activeMovie={activeMovie} modal={modals.playVideoModal} />
    </div>
  );
}

export default Home;
