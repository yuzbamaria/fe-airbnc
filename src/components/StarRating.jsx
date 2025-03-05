import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from "./styles/StarRating.module.css"

export default function StarRating({rating}) {
    const totalStars = 5;
    const starArr = Array.from({ length: totalStars }, ((_, index) => index < rating ? "checked" : "empty"));

    return (
        <>
            <div>
                {starArr.map((status, i) => (
                    <span key={i}>
                        <FontAwesomeIcon 
                            icon={faStar}
                            className={`${status === "checked" ? styles.checked : styles.empty}`} 
                        />
                    </span>
                ))}
            </div>
        </>
    )
}

