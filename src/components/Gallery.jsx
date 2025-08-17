import { useState, useRef } from "react";
import styles from "./styles/Gallery.module.css";
import { rightArrow } from "../icons";

export default function Gallery({ images }) {
  const [index, setIndex] = useState(0);
  const mainRef = useRef(null);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const selectImage = (i) => setIndex(i);

  // Swipe gesture logic
  const handleTouchStart = (e) =>
    (mainRef.current.startX = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (mainRef.current.startX - endX > 50) nextImage();
    else if (endX - mainRef.current.startX > 50) prevImage();
  };

  return (
    <div className={styles.gallery_container}>
      {/* Main image with fade animation */}
      <div
        className={styles.main_image}
        ref={mainRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={index} // key forces React to animate change
          src={images[index]}
          alt={`Property ${index + 1}`}
          loading="lazy"
          className={styles.fade}
        />


        {/* Left button - flipped icon */}
        <button
          className={`${styles.arrow_btn} ${styles.left_btn}`}
          onClick={prevImage}
        >
          <span className={styles.flip}>{rightArrow}</span>
        </button>

        {/* Right button - normal icon */}
        <button
          className={`${styles.arrow_btn} ${styles.right_btn}`}
          onClick={nextImage}
        >
          {rightArrow}
        </button>
      </div>

      {/* Dots (for mobile only) */}
        <div className={styles.dot_row}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === index ? styles.active_dot : ""}`}
              onClick={() => selectImage(i)}
            />
          ))}
        </div>

      {/* Thumbnail row */}
      <div className={styles.thumbnail_row}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i + 1}`}
            loading="lazy"
            className={`${styles.thumbnail} ${i === index ? styles.active : ""}`}
            onClick={() => selectImage(i)}
          />
        ))}
      </div>
    </div>
  );
}
