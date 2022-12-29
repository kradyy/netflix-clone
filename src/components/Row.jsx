import { useEffect, useState } from "react";
import api from "../axios";
import Card from "./Card";
import ScrollContainer from "react-indiana-drag-scroll";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Row(props) {
  const { endpoint, setSelectedTitle, type, modals } = props;

  const [videos, setvideos] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");

  const scrollRow = (event, direction) => {
    const elem = event.currentTarget;
    const scrollContainer = elem.parentElement.querySelector(
      ".row_cards__scrollable"
    );

    if (direction === "left") {
      scrollContainer.scrollLeft = scrollContainer.scrollLeft - 200;
    } else {
      scrollContainer.scrollLeft = scrollContainer.scrollLeft + 200;
    }
  };

  // Fetch video data from TMDB API
  useEffect(() => {
    if (!endpoint || !endpoint?.url) {
      setFetchStatus("error");
      return;
    }

    api
      .get(endpoint.url)
      .then((response) => {
        if (response.data) {
          setvideos(response.data.results);
          setFetchStatus("done");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setFetchStatus("error");
      });
  }, [endpoint]);

  return (
    <div className="row mb-4 select-none -mx-12">
      <h2 className="text-white -mb-8 mx-12">{endpoint?.title}</h2>

      {fetchStatus === "idle" && (
        <p className="text-white text-center">Loading...</p>
      )}
      {fetchStatus === "error" && (
        <p className="text-white text-center">Something went wrong.</p>
      )}

      {fetchStatus === "done" && (
        <div className="row__cards relative h-full w-full group">
          <MdChevronLeft
            size={35}
            className="bg-white rounded-full opacity-30 absolute top-[50%] translate-y-[-50%] left-0 hover:opacity-100 cursor-pointer z-30 hidden transition-all duration-500 group-hover:block"
            onClick={(event) => scrollRow(event, "left")}
          />
          <div
            className="relative h-full w-[120%]"
          >
            <ScrollContainer draggingClassName="overflow-hidden" className="row_cards__scrollable py-12 px-12 overflow-y-hidden overflow-x-visible w-100 flex flex-row space-x-2 cursor-pointer relative group">
                {videos &&
                  videos.map((video, i) => {
                    return (
                      <Card video={video} type={type} key={video.id} modals={modals} endpoint={endpoint} setSelectedTitle={setSelectedTitle} />
                    )
                  })}
              </ScrollContainer>
          </div>
          <MdChevronRight
            size={35}
            className="bg-white rounded-full opacity-30 absolute top-[50%] translate-y-[-50%] right-0 hover:opacity-100 cursor-pointer z-30 hidden transition-all duration-500 group-hover:block"
            onClick={(event) => scrollRow(event, "right")}
          />
        </div>
      )}
    </div>
  );
}

export default Row;
