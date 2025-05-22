import styles from "./styles/PropertyTypes.module.css";

export default function PropertyTypes({ propertyTypes, handlePropertyTypeChange, selectedPropertyType }) {
    return (
        <>  
            {propertyTypes.map(type => {
                const imagePath = `/images/${type.toLowerCase()}.png`;
                const isActive = selectedPropertyType === type;
                return (
                    <button 
                        key={type} 
                        className={ `${styles.propertyTypeBtn} ${isActive ? styles.activePropertyType : ''}` }
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
