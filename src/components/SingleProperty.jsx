import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles/SingleProperty.module.css";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";

export default function SingleProperty() {
    const { id } = useParams();
    const [property, setProperty] = useState({
        property_id: null,
        property_name: "",
        location: "",
        price_per_night: "",
        description: "",
        host: "",
        host_avatar: null,
        favourite_count: "",
        images: []
    });

    useEffect(() => {
        axios.get(`https://be-airbnc-zw86.onrender.com/api/properties/${id}`)
            .then((response) => {
                setProperty(response.data.property);
        })
            .catch((error) => {
            console.error(error);
            });
    }, [id]);

    const images = property.images;
    return (
            <main>
                <section className={styles.propertySection}>
                    <div className={styles.photoGallery}>
                        <Gallery images={images}/>
                    </div>
                    <div className={styles.propertyInfoContainer}>
                        <h2 className={styles.singlePropertyName}>{property.property_name}</h2>
                        <p className={styles.singlePropertyDescription}>{property.description}</p>
                        <p className={styles.singlePropertyLocation}>Located in {property.location}</p>
                        <Link 
                            to={`/property/${id}/reviews`} 
                            className={styles.reviewsLink}>Reviews
                        </Link>
                        <p><span style={{ fontWeight: 'bold'}}>£{property.price_per_night}</span> per night</p>
                    </div>
                    <div className={styles.host_info}>
                        <div className={styles.avatar_container}>
                            <img 
                                src={property.host_avatar} 
                                alt="host_avatar" width="50px"
                                className={styles.hostAvatar}
                            />
                        </div>
                        <p className={styles.hostFullName}>Hosted by {property.host}</p>
                    </div>
                    <div className={styles.propertyReservationContainer}>
                        <button className={styles.reserveBtn}>Reserve</button>
                    </div>
                </section>
            </main>
    )
}