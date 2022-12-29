import { useMemo } from "react";
import Row from "./Row";
import { endpoints } from "../tmdb";

function Gallery({ setSelectedTitle, layout, modals }) {
  const { type, genres } = layout;
  
  return (
    <main className="gallery container overflow-visible fade-switch z-10 relative rows -mt-10">
      {genres.map((genre, i) => {
        let endpoint = endpoints[type].find((item) => item.genre === genre);

        return (
          endpoint && (
            <Row
              key={i}
              endpoint={endpoint}
              modals={modals}
              type={type}
              setSelectedTitle={setSelectedTitle}
            />
          )
        );
      })}
    </main>
  );
}

export default Gallery;
