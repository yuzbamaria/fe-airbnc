import SkeletonPropertyTypes from "./SkeletonLoader/SkeletonPropertyTypes";
import styles from "./styles/PropertyTypes.module.css";

export default function PropertyTypes({
  propertyTypes,
  handlePropertyTypeChange,
  selectedPropertyType,
  isLoading
}) {
  return (
    <>
      {isLoading
        ? Array.from({ length: 9 }).map((_, i) => (
            <SkeletonPropertyTypes key={i} />
          ))
        : propertyTypes.map((type) => {
            const imagePath = `/images/${type.toLowerCase()}.png`;
            const isActive = selectedPropertyType === type;
            return (
              <button
                key={type}
                className={`${styles.propertyTypeBtn} ${isActive ? styles.activePropertyType : ""}`}
                onClick={handlePropertyTypeChange}
              >
                <img
                  src={imagePath}
                  alt={type}
                  className={styles.propertyTypeIcon}
                />
                {type}
              </button>
            );
          })}
    </>
  );
}
