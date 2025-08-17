import "../styles/SkeletonLoader/skeleton.css";
import styles from "../styles/SkeletonLoader/SkeletonSingleProperty.module.css";

export default function SkeletonSingleProperty() {
    return (

            <section className={styles.propertySection}>

                {/* GALLERY SKELETON */}
                <div className={`${styles.gallery_container}`}>
                    <div className={styles.galleryImg}>
                        <div className="skeleton-image-placeholder" />
                    </div>
                    <div className={styles.left_btn}>
                        <div/>
                    </div>
                    <div className={styles.right_btn}>
                        <div/>
                    </div>
                </div>

                {/* PROPERTY INFO SKELETON */}
                <div className={styles.propertyInfoContainer}>
                    <div className={styles.topContainerInfo}>
                        <div className="skeleton-text-line" style={{ width: "50%", height: "1.5rem" }} />
                        <div className="skeleton-icon-placeholder" />
                    </div>
                    <div className={styles.singlePropertyDescription}>
                        <div className="skeleton-text-line" style={{ width: "100%", height: "1rem" }} />
                    </div>
                    <div className={styles.singlePropertyLocation}>
                        <div className="skeleton-text-line" style={{ width: "40%", height: "0.8rem" }} />
                    </div>
                    <div className="skeleton-link-placeholder" style={{ width: "100px", height: "0.8rem" }} />
                    <div>
                        <div className="skeleton-text-line" style={{ width: "40%", height: "1rem" }} />
                    </div>
                </div>

                {/* HOST INFO SKELETON */}
                <div className={styles.host_info}>
                    <div className={styles.avatar_container}>
                        <div className="skeleton-avatar-placeholder" />
                    </div>
                    <div className="skeleton-text-line" style={{ width: "200px", height: "1rem" }} />
                </div>

                {/* RESERVE BUTTON SKELETON */}
                <div className={styles.propertyReservationContainer}>
                    <div className="skeleton-button-placeholder" />
                </div>
    </section>
  );
}

