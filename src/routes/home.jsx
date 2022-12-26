import React from "react";
import Banner from "../components/Banner";
import Gallery from "../components/Gallery";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { useState } from "react";
import { useModal } from "react-morphing-modal";
import { useParams } from "react-router-dom";
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
  const { modalProps, open } = useModal();

  const { category } = useParams();

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
        openVideoModal={open}
      />
      <Gallery setSelectedTitle={setSelectedTitle} layout={DEFAULT_LAYOUT} />
      <Player modalProps={modalProps} activeMovie={activeMovie} />
    </div>
  );
}

export default Home;
