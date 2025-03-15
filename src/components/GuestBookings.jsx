import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/GuestBookings.module.css";

export default function GuestBookings({id}) {
    const [guestBookings, setGuestBookings] = useState([]);

    useEffect(() => {
        axios.get(`https://be-airbnc-zw86.onrender.com/api/users/${id}/bookings`)
        .then((res) => {
            setGuestBookings(res.data.bookings);
        })
    }, [id]);

    function handleDeleteBookingBtnClick(bookingId) {
        axios.delete(`https://be-airbnc-zw86.onrender.com/api/bookings/${bookingId}`)
            .then(() => {
                setGuestBookings((prevBookings) => prevBookings.filter(({booking_id}) => booking_id !== bookingId))
            });
    }

    return (
            <section className={styles.guestBookings}>
                <h3 className={styles.guestBookingsHeading}>Bookings</h3>
                {guestBookings.map(({ booking_id, check_in_date, check_out_date, property_name, host, images }, i) => (
                    <div className={styles.bookingCard} key={i}>
                        <p>You booked a stay at <span className={styles.mainInfo}>{property_name}</span></p>
                        <img src={images[0]} alt={property_name} className={styles.itemImg}/>
                        
                        <div className={styles.datesContainer}>
                            <p className={styles.mainInfoCategory}>Check-in-date:</p>
                            <p className={styles.mainInfo}>{check_in_date.slice(0, 10)}</p>
                        </div>
                        
                        
                        <div className={styles.datesContainer}>
                            <p className={styles.mainInfoCategory}>Check-out-date:</p>
                            <p className={styles.mainInfo}>{check_out_date.slice(0, 10)}</p>
                        </div>
                        
                        <p>Hosted by <span className={styles.mainInfo}>{host}</span></p>
                        <div className={styles.bookingBtnsContainer}>
                            <button
                                className={styles.editBookingBtn}
                            >
                                Edit booking
                            </button>
                            <button
                                onClick={() => handleDeleteBookingBtnClick(booking_id)}
                                className={styles.deleteBookingBtn}
                            >
                                Delete booking
                            </button>
                        </div>

                    </div>
                ))
                }  
            </section>
    )
}