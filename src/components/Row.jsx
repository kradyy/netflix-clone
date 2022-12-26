import { useEffect, useState } from "react";
import instance from "../axios";
import { basePath } from "../tmdb";
import ScrollContainer from "react-indiana-drag-scroll";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const POSTER_SIZES = {
  vertical: "256px",
  horizontal: "156px",
};

function Row(props) {
  const { endpoint, setSelectedTitle } = props;

  console.log('endpoint', endpoint)
  const [movies, setMovies] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");

  const posterLayouts = {
    vertical: {
      class: `row__posters--vertical object-contain rounded w-100 max-h-[${POSTER_SIZES.vertical}] transition-all duration-500 hover:scale-[1.09]`,
      imageType: "poster_path",
    },
    horizontal: {
      class: `row__posters--horizontal object-contain rounded  w-100 max-h-[${POSTER_SIZES.horizontal}] transition-all duration-500 hover:scale-[1.11]`,
      imageType: "backdrop_path",
    },
  };

  const updateSelectedTitle = async (movie) => {
    window.scrollTo(0, 0);
    setSelectedTitle(movie);
  };

  const posterLayout = Object.keys(posterLayouts).includes(
    endpoint?.orientation
  )
    ? posterLayouts[endpoint?.orientation]
    : posterLayouts["horizontal"];

  const scrollRow = (event, direction) => {
    const elem = event.currentTarget;
    const scrollContainer = elem.parentElement.querySelector(
      ".row_posters__scrollable"
    );

    if (direction === "left") {
      scrollContainer.scrollLeft = scrollContainer.scrollLeft - 200;
    } else {
      scrollContainer.scrollLeft = scrollContainer.scrollLeft + 200;
    }
  };

  useEffect(() => {
    if (!endpoint || !endpoint?.url) {
      setFetchStatus("error");
      return;
    }

    instance
      .get(endpoint.url)
      .then((response) => {
        if (response.data) {
          setMovies(response.data.results);
          setFetchStatus("done");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setFetchStatus("error");
      });
  }, [endpoint]);

  const boxHeight =
    (endpoint?.orientation && POSTER_SIZES[endpoint.orientation]) || "156px";

  return (
    <div className="row mb-12 select-none -mx-5">
      <h2 className="text-white px-5">{endpoint?.title}</h2>

      {fetchStatus === "idle" && (
        <p className="text-white text-center">Loading...</p>
      )}
      {fetchStatus === "error" && (
        <p className="text-white text-center">Something went wrong.</p>
      )}

      {fetchStatus === "done" && (
        <div className="row__posters relative h-full w-full group">
          <MdChevronLeft
            size={35}
            className="bg-white rounded-full opacity-30 absolute top-[50%] translate-y-[-50%] left-0 hover:opacity-100 cursor-pointer z-30 hidden transition-all duration-500 group-hover:block"
            onClick={(event) => scrollRow(event, "left")}
          />
          <div
            className="relative w-full w-[120%]"
            style={{ height: boxHeight }}
          >
            <div className="absolute left-0 top-0">
              <ScrollContainer className="row_posters__scrollable px-5 py-5 overflow-y-hidden overflow-x-visible e w-100 flex flex-row space-x-2 cursor-pointer relative">
                {movies &&
                  movies.map((movie) => {
                    const image = movie[posterLayout.imageType];

                    return (
                      <img
                        key={movie.id}
                        src={image ? basePath + image : null}
                        alt={movie.name}
                        className={posterLayout.class}
                        onClick={() => updateSelectedTitle(movie)}
                      />
                    );
                  })}
              </ScrollContainer>
            </div>
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
