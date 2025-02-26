import { useState } from "react";
import styles from "./styles/Gallery.module.css"

export default function Gallery({ images }) {
  const [index, setIndex] = useState(0);

  // const gallery = [
  //   { link: "https://placecats.com/neo/200/200", alt: "Neo" },
  //   { link: "https://placecats.com/millie/200/200", alt: "Millie" },
  //   { link: "https://placecats.com/bella/199/200", alt: "Bella" },
  // ];

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevImage) => (prevImage - 1 + images.length) % images.length);
    if (index === 0) {
      setIndex(images.length - 1);
    }
  };

  const currentImage = images[index];
  console.log(currentImage)
  return (
    <>
      <div className={styles.gallery_container}>

          <div className={styles.galleryImg}>
            <img src={currentImage} alt={`Property image ${index + 1}`} className={styles.image}/>
          </div>

          <div className={styles.left_btn}>
            <button onClick={prevImage}>&#10094;</button>
          </div>
          <div className={styles.right_btn}>
            <button onClick={nextImage}>&#10095;</button>
          </div>

      </div>
    </>
  );
}
