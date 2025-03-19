import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles/BookingConfirmation.module.css";
import { useUser } from "../contexts/UserContext";

export default function BookingConfirmation() {
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");
    const bookingId = searchParams.get("booking_id");
    const { guestId } = useUser();

    return (
        <>
            <main>
                <section className={styles.bookingConfirmation}>
                    <p>{msg}. Enjoy your stay!</p>
                    <p>Your booking ID: {bookingId}.</p>
                    <div className={styles.linksContainer}>
                        <Link to={`/`} className={styles.homeLink}>
                            Return to Home page
                        </Link>
                        <Link to={`/users/${guestId}`} className={styles.homeLink}>
                            See all your bookings
                        </Link>
                    </div>
                    
                </section>
            </main>
        </>
    )
}