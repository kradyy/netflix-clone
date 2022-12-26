import Row from "./Row";

function Gallery({ setSelectedTitle, setActiveMovie }) {
  const rows = [];

  return (
    <div className="rows mt-10">
      {rows.map((row) => {
        return (
          <Row
            key={row.title}
            title={row.title}
            endpoint={row.endpoint}
            orientation={row.orientation}
            setSelectedTitle={setSelectedTitle}
          />
        );
      })}
    </div>
  );
}

export default Gallery;
