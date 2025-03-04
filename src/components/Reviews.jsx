import styles from "./styles/Reviews.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://be-airbnc-zw86.onrender.com/api/properties/${id}/reviews`)
            .then((response) => {
                setReviews(response.data.reviews);
        })
            .catch((error) => {
            console.error(error);
            });
    }, [id]);


    return (
        <>
            <main>
                <section>
                    <h2 className={styles.reviewsHeading}>{reviews.length} reviews</h2>
                    <div className={styles.reviewsContainer}>
                        {reviews.map((review) => (
                            <div key={review.review_id} className={styles.reviewContainer}>
                                <div className={styles.guest_info}>
                                    <div className={styles.guestAvatarContainer}>
                                        <img 
                                            src={review.guest_avatar} 
                                            alt="guest_avatar" width="50px"
                                            className={styles.guestAvatar}
                                        />
                                    </div>
                                    <p className={styles.guestName}>{review.guest}</p>
                                </div>
                                <StarRating rating={review.rating}/>
                                <p>Reviewed: {review.created_at.slice(0, 10)}</p>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}