import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/GuestBookings.module.css";
import formatDate from "../utils";

export default function GuestBookings({id}) {
    const [guestBookings, setGuestBookings] = useState([]);
    const [updatedBooking, setUpdatedBooking] = useState(null);
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

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
    };

    function editBookingBtnClick(booking) {
        setIsModalOpen(true);
        setUpdatedBooking(booking);
        setEditingBookingId(booking.booking_id);
    };

    function handleSaveChangesBtn(e) {
        e.preventDefault();
        axios
            .patch(`https://be-airbnc-zw86.onrender.com/api/bookings/${updatedBooking.booking_id}`, {

                check_in_date: updatedBooking.check_in_date,
                check_out_date: updatedBooking.check_out_date,
            })
            .then((res) => { 
                const updatedBooking = res.data;
                const newGuestBookings = guestBookings.map(booking => 
                    booking.booking_id === updatedBooking.booking_id 
                        ? {...booking, ...updatedBooking} 
                        : booking
                );
                setGuestBookings(newGuestBookings);
                setSuccessMessage(true);
            })
            .catch((err) => {
                console.error('Error updating booking:', err); 
                if (err.response) {
                    console.error('Error Response:', err.response); 
                }
            });
    };

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingBookingId(null);
    };

    return (
            <section className={styles.guestBookings}>
                <h3 className={styles.guestBookingsHeading}>Bookings</h3>
                {guestBookings.map(({ booking_id, check_in_date, check_out_date, property_name, host, images }, i) => (
                    <div className={styles.bookingCard} key={i}>
                        <p>You booked a stay at <span className={styles.mainInfo}>{property_name}</span></p>
                        <img src={images[0]} alt={property_name} className={styles.itemImg}/>
                        
                        <div className={styles.datesContainer}>
                            <p className={styles.mainInfoCategory}>Check-in date:</p>
                            <p className={styles.mainInfo}>{formatDate(check_in_date)}</p>
                        </div>
                        
                        <div className={styles.datesContainer}>
                            <p className={styles.mainInfoCategory}>Check-out date:</p>
                            <p className={styles.mainInfo}>{formatDate(check_out_date)}</p>
                        </div>
                        
                        <p>Hosted by <span className={styles.mainInfo}>{host}</span></p>
                        <div className={styles.bookingBtnsContainer}>
                            <button
                                onClick={() => editBookingBtnClick({booking_id, check_in_date, check_out_date})}
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
                        
                        {isModalOpen && editingBookingId === booking_id && updatedBooking && (
                            <div className={styles.editBookingModal}>
                                <div className={styles.editBookingSection}>
                                    <div className={styles.modalTop}>
                                        <h4 className={styles.editBookingHeading}>Edit your booking:</h4>
                                        <span className={styles.closeModalIcon} onClick={handleCloseModal}>&times;</span>
                                    </div>
                                    
                                    <form 
                                        className={styles.editBookingForm} 
                                        onSubmit={handleSaveChangesBtn}
                                    > 
                                        <label htmlFor="check_in_date" className={styles.editBookingFormLabel}>
                                            Check-in date:
                                            <br />
                                            <input 
                                                type="date" 
                                                id="check_in_date"
                                                value={updatedBooking.check_in_date} 
                                                name="check_in_date" 
                                                className={styles.editBookingFormInput}
                                                onChange={(e) => setUpdatedBooking({
                                                    ...updatedBooking,
                                                    check_in_date: e.target.value
                                                })}
                                                required/>
                                        </label>
                                        <br />
                    
                                        <label htmlFor="check_out_date" className={styles.editBookingFormLabel}>
                                            Check-out date:
                                            <br />
                                            <input 
                                                type="date" 
                                                id="check_out_date" 
                                                value={updatedBooking.check_out_date} 
                                                name="check_out_date" 
                                                className={styles.editBookingFormInput}
                                                onChange={(e) => setUpdatedBooking({
                                                    ...updatedBooking,
                                                    check_out_date: e.target.value
                                                })}
                                                required/>
                                        </label>
                                        <br />

                                        {successMessage && (
                                            <p className={styles.successMessage}>Your booking is successfully updated!</p>
                                        )}

                                        <input 
                                            type="submit" 
                                            value="Save changes" 
                                            className={styles.saveChangesBtn}
                                        />
                                    </form>
                                </div> 
                            </div>
                        )}
                    </div>
                ))
                }  
                
            </section>
    )
}