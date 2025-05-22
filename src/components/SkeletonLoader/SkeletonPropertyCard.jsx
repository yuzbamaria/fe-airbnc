import styles from "../styles/SkeletonLoader/SkeletonPropertyCard.module.css";
import "../styles/SkeletonLoader/skeleton.css";

export default function SkeletonPropertyCard() {
    return (
        <div className={styles.itemContainer}>
            <div className={`${styles.itemImg} skeleton-property-card`}></div>
            <div className="skeleton-text-line"></div>
            <div className="skeleton-text-line short"></div>
            <div className="skeleton-text-line short"></div>
        </div>
    )
}