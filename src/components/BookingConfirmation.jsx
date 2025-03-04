import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles/BookingConfirmation.module.css";

export default function BookingConfirmation() {
    const [searchParams] = useSearchParams();
    const msg = searchParams.get("msg");
    const bookingId = searchParams.get("booking_id")

    return (
        <>
            <main>
                <section className={styles.bookingConfirmation}>
                    <p>{msg}. Enjoy your stay!</p>
                    <p>Your booking ID: {bookingId}.</p>
                    <Link to={`/`} className={styles.homeLink}>
                        Return to Home page
                    </Link>
                </section>
            </main>
        </>
    )
}