import styles from "./styles/PropertyBooking.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function PropertyBooking() {
    const { id } = useParams();
    const { guestId } = useUser();
    const navigate = useNavigate();
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");

    const userData = {
        guest_id: guestId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate
    };

    function bookProperty() {
        axios.post(`https://be-airbnc-zw86.onrender.com/api/properties/${id}/booking`, userData)
        .then((response) => {
            navigate(`/booking-confirmation?msg=${response.data.msg}&booking_id=${response.data.booking_id}`);
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    function handleBookingPropertySubmit(e) {
        e.preventDefault();
        bookProperty();
    };

    return (
            <main>
                <div className={styles.bookingFormContainer}>
                    <h2 className={styles.propertyBookingHeading}>Enter your details:</h2>
                    <form className={styles.bookingForm} onSubmit={handleBookingPropertySubmit}>
                        
                        <label htmlFor="guestId" className={styles.bookingFormLabel}>
                            Guest id:
                            <br />
                            <input 
                                type="text" 
                                id="guestId"
                                value={guestId} 
                                name="guest" 
                                className={styles.bookingFormInput}
                                readOnly
                            />
                        </label>
                        
                        <label htmlFor="check_in_date" className={styles.bookingFormLabel}>
                            Check-in date:
                            <br />
                            <input 
                                type="date" 
                                id="check_in_date"
                                value={checkInDate} 
                                name="check_in_date" 
                                className={styles.bookingFormInput}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                required/>
                        </label>

                        <label htmlFor="check_out_date" className={styles.bookingFormLabel}>
                            Check-out date:
                            <br />
                            <input 
                                type="date" 
                                id="check_out_date" 
                                value={checkOutDate} 
                                name="check_out_date" 
                                className={styles.bookingFormInput}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                required/>
                        </label>
                        
                        <input 
                            type="submit" 
                            value="Book" 
                            className={styles.bookingBtn}
                        />
                    </form>
                </div>
            </main>
    )
}