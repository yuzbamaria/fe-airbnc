import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/GuestProfile.module.css";
import GuestBookings from "./GuestBookings";
import formatDate from "../utils";

export default function GuestProfile() {
    const { id } = useParams();

    const [guest, setGuest] = useState({
        user_id: null,
        first_name: "",
        surname: "",
        email: "",
        phone_number: null,
        avatar: null,
        created_at: ""
    });
    
    useEffect(() => {
        axios.get(`https://be-airbnc-zw86.onrender.com/api/users/${id}`)
            .then((res) => {
                setGuest(res.data.user);
            })
    }, [id]);

    return (
        <>
            <main>
                <section className={styles.guestProfile}>
                    <h3 className={styles.guestProfileHeading}>Guest Profile</h3>
                    <div>
                        <div className={styles.guestTopContainerInfo}>
                            <div className={styles.guestAvatarContainer}>
                                <img 
                                    src={guest.avatar} 
                                    alt="guest_avatar"
                                    className={styles.guestAvatar}
                                />
                            </div>
                            <p className={styles.guestFullName}>{`${guest.first_name} ${guest.surname}`}</p>
                        </div>
                        <div className={styles.guestPersonalInfo}>
                            <p className={styles.categoryName}>Email:</p>
                            <p className={styles.guestiInfo}>{guest.email}</p>
                        </div>
                        <div className={styles.guestPersonalInfo}>
                            <p className={styles.categoryName}>Phone number:</p>
                            <p className={styles.guestiInfo}>{guest.phone_number}</p>
                        </div>
                        <div className={styles.guestPersonalInfo}>
                            <p className={styles.categoryName}>User since:</p>
                            <p className={styles.guestiInfo}>{formatDate(guest.created_at)}</p>
                        </div>
                    </div>
                </section>
                <GuestBookings id={id}/>   
            </main>
        </>
    )
}