import PropertyCard from "./PropertyCard";
import SkeletonPropertyCard from "./SkeletonLoader/SkeletonPropertyCard";
import styles from "./styles/PropertiesList.module.css";

export default function PropertiesContainer({ properties, onCardClick, isLoading, propertiesRef }) {
  return (
    <div className={styles.listContainer} ref={propertiesRef}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => <SkeletonPropertyCard key={i} />)
        : properties.map((property) => (
            <PropertyCard
              key={property.property_id}
              property={property}
              onClick={onCardClick}
            />
          ))}
    </div>
  )
}
