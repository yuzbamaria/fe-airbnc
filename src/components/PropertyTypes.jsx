import styles from "./styles/PropertyTypes.module.css";

export default function PropertyTypes({ propertyType, handlePropertyTypeChange }) {
    return (
        <>  
            {propertyType.map(type => {
                const imagePath = `/images/${type.toLowerCase()}.png`;
                return (
                    <button 
                        key={type} 
                        className={styles.propertyTypeBtn}
                        onClick={handlePropertyTypeChange}
                    >
                        <img 
                            src={imagePath} 
                            alt={type} 
                            className={styles.propertyTypeIcon} 
                        />
                        {type}
                    </button>
                )
            })}
        </>
    ) 
};
