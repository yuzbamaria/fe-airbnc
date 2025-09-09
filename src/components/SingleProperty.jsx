import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles/SingleProperty.module.css";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
import FavouriteProperty from "./FavouriteProperty";
import SkeletonSingleProperty from "./SkeletonLoader/SkeletonSingleProperty";
import "./styles/SkeletonLoader/skeleton.css";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://be-airbnc-zw86.onrender.com/api/properties/${id}`)
            .then((response) => {
                setProperty(response.data.property);
                setIsLoading(false);
        })
            .catch((error) => {
            console.error(error);
            });
    }, [id]);

    const images = property.images;
    return (
            <div className={styles.main}>
                {isLoading 
                ? <SkeletonSingleProperty /> 
                : <section className={styles.propertySection}>
                    <Gallery images={images}/> 
                    
                    {/* PROPERTY INFO */}
                    <div className={styles.propertyInfoContainer}>
                        <div className={styles.topContainerInfo}>
                            <h2 className={styles.singlePropertyName}>{property.property_name}</h2>
                            <FavouriteProperty />
                        </div>
                        <p className={styles.singlePropertyDescription}>
                            {property.description}
                        </p>
                        <p className={styles.singlePropertyLocation}>
                            {`Located in ${property.location}`}
                        </p>
                        <Link 
                            to={`/property/${id}/reviews`} 
                            className={styles.reviewsLink}
                        >
                            Reviews
                        </Link>
                        <p>
                            <span style={{ fontWeight: 'bold'}}> £{property.price_per_night} per night</span>
                        </p>
                    </div>

                    {/* HOST INFO */}
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

                    {/* RESERVE BUTTON */}
                    <div className={styles.propertyReservationContainer}>
                        
                        <Link 
                            to={`/properties/${id}/booking`} 
                            className={styles.reserveBtn}
                        >
                            Reserve
                        </Link>
                    </div>
                </section>
                }
            </div>
    )
}