import "../styles/SkeletonLoader/skeleton.css";
import styles from "../styles/SkeletonLoader/SkeletonPropertyTypes.module.css";

export default function SkeletonPropertyTypes() {

    return (
        <>
            <div className={ `${styles.propertyTypeBtn} skeleton-property-type` }></div>
        </>
    );
}