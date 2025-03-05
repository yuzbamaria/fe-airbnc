import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles/HostDashboard.module.css";
import StarRating from "./StarRating";

export default function HostDashboard() {
    const [searchParams] = useSearchParams();
    const [hostBookings, setHostBookings] = useState([]);
    const hostId = searchParams.get("host");

    useEffect(() => {
        axios.get("https://be-airbnc-zw86.onrender.com/api/properties", {
            params: searchParams
        })
        .then((res) => {
            setHostBookings(res.data.properties)
        })
    }, [hostId]);
    
    return (
        <>
            <main>
                <section className={styles.dashboard}>
                    <p className={styles.dashboardHeading}>Dashboard</p>
                    <p className={styles.dashboardSubheading}>Owned properties</p>
                    {hostBookings.map(({ property_name, location, price_per_night, image }, id) => (
                        <div key={id} className={styles.hostBookedPropertiesCard}>
                            <p>{property_name}</p>
                            <p>{location}</p>
                            <p>£{price_per_night} night</p>
                            <img src={image} alt={property_name} className={styles.itemImg} />
                        </div>
                    ))}
                </section>
            </main>
        </>
    )
}