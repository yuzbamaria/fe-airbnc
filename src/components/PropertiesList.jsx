import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/PropertiesList.module.css";
import { useNavigate } from "react-router-dom";

export default function PropertiesList() {
    const [propertiesList, setPropertiesList] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get("https://be-airbnc-zw86.onrender.com/api/properties")
            .then((response) => {
            setPropertiesList(response.data.properties);
        })
            .catch((error) => {
            console.error(error);
            });
    }, []);

    function handlePropertyCardClick(propertyId) {
        navigate(`/property/${propertyId}`)
    };
    
    return (
        <>
            <main>
                <section>
                    <div className={styles.listContainer}>
                        {propertiesList.map(({ image, property_name, location, price_per_night, property_id }) => (
                            <div 
                                key={property_id} 
                                className={styles.itemContainer}
                                onClick={() =>  handlePropertyCardClick(property_id)} 
                            >
                                <img src={image} alt={property_name} className={styles.itemImg}/>
                                <h3 className={styles.propertyName}>{property_name}</h3>
                                <p className={styles.propertyLocation}>{location}</p>
                                <p className={styles.propertyPrice}>£{price_per_night} night</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}