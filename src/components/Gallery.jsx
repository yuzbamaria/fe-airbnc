import { useState } from "react";

export default function Gallery() {
  const [index, setIndex] = useState(0);

  const gallery = [
    { link: "https://placecats.com/neo/200/200", alt: "Neo" },
    { link: "https://placecats.com/millie/200/200", alt: "Millie" },
    { link: "https://placecats.com/bella/199/200", alt: "Bella" },
  ];

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const prevImage = () => {
    setIndex((prevImage) => (prevImage - 1) % gallery.length);
    if (index === 0) {
      setIndex(gallery.length - 1);
    }
  };

  let photo = gallery[index];

  return (
    <>
      <div className="gallery-container">
        <div className="left-btn">
          <button onClick={prevImage}>Left</button>
        </div>
        <div className="stacked-gallery">
          <ul>
            <li className="photo-card" key={photo.alt}>
              <img src={photo.link} alt={photo.alt} />
            </li>
          </ul>
        </div>
        <div className="right-btn">
          <button onClick={nextImage}>Right</button>
        </div>
      </div>
    </>
  );
}
