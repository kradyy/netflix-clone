import Row from "./Row";
import { endpoints } from "../tmdb";

function Gallery({ setSelectedTitle, layout }) {
  const { type, genres } = layout;

  return (
    <div className="container overflow-visible z-10 relative rows -mt-10">
      {genres.map((genre, i) => {
        let endpoint = endpoints[type].find((item) => item.genre === genre);

        return (
          endpoint && (
            <Row
              key={i}
              endpoint={endpoint}
              setSelectedTitle={setSelectedTitle}
            />
          )
        );
      })}
    </div>
  );
}

export default Gallery;
