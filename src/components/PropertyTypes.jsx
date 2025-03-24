import styles from "./styles/PropertyTypes.module.css";

export default function PropertyTypes({ propertyType }) {
    return (
        <>  
            {propertyType.map(type => {
                const imagePath = `/images/${type.toLowerCase()}.png`;
                return (
                    <button 
                        key={type} 
                        className={styles.propertyTypeBtn}
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
