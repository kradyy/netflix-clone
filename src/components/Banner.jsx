import { useEffect, useRef } from "react";
import { basePath, endpoints } from "../tmdb";
import instance from "../axios";

function Banner({
  selectedTitle,
  setSelectedTitle,
  setActiveMovie,
  openVideoModal,
}) {
  // Open a modal with the trailer on click
  const triggerRef = useRef(null);
  const openModal = () =>
    openVideoModal(triggerRef, {
      onClose: () => {
        setActiveMovie(null);
        //console.log('active movie is unset!', setActiveMovie)
      },
      onOpen: () => {
        setActiveMovie(selectedTitle);
      },
    });

  // Set a random title as the selected title
  useEffect(() => {
    const types = Object.keys(endpoints);
    const randomType =
      endpoints[types[Math.floor(Math.random() * types.length)]];
    const randomGenre =
      randomType[Math.floor(Math.random() * randomType.length) + 1];

    instance.get(randomGenre.url).then((response) => {
      if (response.data) {
        const randomIndex =
          Math.floor(Math.random() * response.data.results.length) + 1;
        setSelectedTitle(response.data.results[randomIndex]);
      }
    });
  }, []);

  return (
    <header
      className="banner w-100 md:h-[610px] lg:h-[810px] flex bg-no-repeat bg-cover relative"
      style={{
        backgroundImage: `url(${basePath}${selectedTitle?.backdrop_path})`,
      }}
    >
      <div className="banner_fadeTop absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-black to-transparent" />

      <div class="container">
        <div className="w-1/2 h-full items-center flex justify-start">
          <div className="flex flex-col">
            <h1 className="text-6xl font-medium text-white">
              {selectedTitle?.name ||
                selectedTitle?.title ||
                selectedTitle?.original_name}
            </h1>
            <div className="description text-white">
              <p className="text-xl font-light my-4">
                {selectedTitle?.overview.length > 200
                  ? selectedTitle?.overview.slice(0, 200) + "..."
                  : selectedTitle?.overview}
              </p>
            </div>
            <div className="buttons flex space-x-4">
              <button
                className="buttons__play transition-all duration-500 shadow-sm leading-4 rounded py-3 px-4 font-medium flex items-center space-x-2 bg-white hover:shadow-lg hover:scale-105"
                ref={triggerRef}
                onClick={openModal}
              >
                <svg
                  width="9"
                  height="13"
                  viewBox="0 0 9 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M0.245728 12.448L8.24573 6.448L0.245728 0.447998"
                    fill="#141414"
                  />
                </svg>
                <span>Play</span>
              </button>

              <button className="buttons__more-info buttons__play transition-all duration-500 shadow-sm leading-4 rounded py-3 px-4 font-medium flex items-center space-x-2 text-white bg-white bg-opacity-50 hover:shadow-lg hover:scale-105">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.61719 2.09517C5.00223 2.09517 2.07173 5.02567 2.07173 8.64063C2.07173 12.2556 5.00223 15.1861 8.61719 15.1861C12.2321 15.1861 15.1626 12.2556 15.1626 8.64063C15.1626 5.02567 12.2321 2.09517 8.61719 2.09517ZM0.617188 8.64063C0.617188 4.22235 4.19891 0.640625 8.61719 0.640625C13.0355 0.640625 16.6172 4.22235 16.6172 8.64063C16.6172 13.0589 13.0355 16.6406 8.61719 16.6406C4.19891 16.6406 0.617188 13.0589 0.617188 8.64063Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.61719 7.64062C9.16947 7.64062 9.61719 8.01372 9.61719 8.47396V11.8073C9.61719 12.2675 9.16947 12.6406 8.61719 12.6406C8.0649 12.6406 7.61719 12.2675 7.61719 11.8073V8.47396C7.61719 8.01372 8.0649 7.64062 8.61719 7.64062Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.61719 5.64062C7.61719 5.08834 8.06268 4.64062 8.61221 4.64062H8.62216C9.1717 4.64062 9.61719 5.08834 9.61719 5.64062C9.61719 6.19291 9.1717 6.64062 8.62216 6.64062H8.61221C8.06268 6.64062 7.61719 6.19291 7.61719 5.64062Z"
                    fill="white"
                  />
                </svg>

                <span>More info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="banner_fadeBottom absolute bottom-0 bg-gradient-to-b h-40 from-transparent via-dark to-dark w-full" />
    </header>
  );
}

export default Banner;
