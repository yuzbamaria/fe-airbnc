import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/PropertiesList.module.css";

export default function PropertiesList() {
    const [propertiesList, setPropertiesList] = useState([]);
    
    useEffect(() => {
        axios.get("https://be-airbnc-zw86.onrender.com/api/properties")
            .then((response) => {
            setPropertiesList(response.data.properties);
        })
            .catch((error) => {
            console.error(error);
            });
    }, []);
    
    return (
        <>
            <main>
                <section>
                    <ul className={styles.listContainer}>
                        {propertiesList.map(({ image, property_name, location, price_per_night, property_id }) => (
                            <div key={property_id} className={styles.itemContainer}>
                                <img src={image} alt={property_name} className={styles.itemImg}/>
                                <h3 className={styles.propertyName}>{property_name}</h3>
                                <p className={styles.propertyLocation}>{location}</p>
                                <p className={styles.propertyPrice}>£{price_per_night} night</p>
                            </div>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    )
}