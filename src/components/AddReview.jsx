import styles from "./styles/AddReview.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
    const { guestId } = useUser();
    const { id } = useParams();
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const userData = {
        guest_id: guestId,
        rating: rating,
        comment: comment
    };

    function addReview() {
        axios.post(`https://be-airbnc-zw86.onrender.com/api/properties/${id}/reviews`, userData)
        .then((response) => {
            navigate(`/property/${id}/reviews`);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const options = [1, 2, 3, 4, 5];

    function handleAddReviewSubmit(e) {
        e.preventDefault();
        addReview();
    };

    return (
        <main>
            <h2 className={styles.newReviewHeading}>Write your review:</h2>
            <form className={styles.newReviewForm} onSubmit={handleAddReviewSubmit}>
                <label htmlFor="guestId" className={styles.newReviewFormLabel}>
                    Guest id:
                    <br />
                    <input 
                        type="text" 
                        id="guestId"
                        value={guestId} 
                        name="guest" 
                        className={styles.newReviewId}
                        readOnly
                    />
                </label>
                <label htmlFor="rating" className={styles.newReviewFormLabel}>
                    Choose your rating:
                    <select 
                        id="rating" 
                        name="rating" 
                        className={styles.selectStyling} 
                        onChange={(e) => setRating(e.target.value)}
                        required>
                        <option>Your rating</option>
                        {options.map((option, index) => (
                            <option key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="comment" className={styles.newReviewFormLabel}>
                    Comment:
                    <br />
                    <input 
                        type="text" 
                        id="comment"
                        value={comment} 
                        name="comment" 
                        className={styles.commentInput}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </label>

                <input 
                    type="submit" 
                    value="Add a review" 
                    className={styles.addReviewBtn}
                />
            </form>
        </main>
    )
}