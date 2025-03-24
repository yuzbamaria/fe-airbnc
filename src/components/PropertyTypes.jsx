import { useState } from "react";
import styles from "./styles/PropertyTypes.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function PropertyTypes({ propertyType }) {
    return (
        <>  
            {propertyType.map(type => (
                <button 
                    key={type} 
                    className={styles.propertyTypeBtn}
                >
                    <FontAwesomeIcon icon={faHouse} className={styles.propertyTypeIcon}/>
                    {type}
                </button>
            ))}
        </>
    ) 
};
