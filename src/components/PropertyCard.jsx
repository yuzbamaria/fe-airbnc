import styles from "./styles/PropertiesList.module.css";

export default function PropertyCard({ property, onClick }) {
  const { images, property_name, location, cost_per_night, property_id } =
    property;

  return (
    <div
      className={styles.itemContainer}
      onClick={() => onClick(property_id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick(property_id)}
    >
      <img
        src={images[0]}
        alt={property_name}
        className={styles.itemImg}
        loading="lazy"
      />
      <h3 className={styles.propertyName}>{property_name}</h3>
      <p className={styles.propertyLocation}>{location}</p>
      <p className={styles.propertyPrice}>£{cost_per_night} night</p>
    </div>
  );
}
