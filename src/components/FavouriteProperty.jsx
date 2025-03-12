import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import styles from "./styles/FavouriteProperty.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export default function FavouriteProperty() {
    const [isFavourited, setIsFavourited] = useState(false);
    const [favouriteId, setFavouriteId] = useState(null);
    const { guestId } = useUser();
    const { id } = useParams();

    useEffect(() => {
        async function fetchFavouriteStatus() {
            try {
                const res = await axios.get(`https://be-airbnc-zw86.onrender.com/api/properties/${id}/favourite`, {
                    params: { user_id: guestId }
                });
                if (res.data.favourite_id) {
                    setFavouriteId(res.data.favourite_id);
                    setIsFavourited(true);
                } else {
                    setFavouriteId(null);
                    setIsFavourited(false);
                };
            } catch (err) {
                console.error(err);
            };
        };
        fetchFavouriteStatus();
    }, [guestId, id, favouriteId]);

    async function handleFavouriteClick() {
        try {
            if (!isFavourited) {
                const response = await axios.post(`https://be-airbnc-zw86.onrender.com/api/properties/${id}/favourite`, { guest_id: guestId });
                setFavouriteId(response.data.favorite_id);
                setIsFavourited(true);
            } else {
                if (!favouriteId) return;
                await axios.delete(`https://be-airbnc-zw86.onrender.com/api/favourites/${favouriteId}`);
                setIsFavourited(false);
                setFavouriteId(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button 
            onClick={handleFavouriteClick} 
            aria-label="Favourite property"
            className={styles.favouriteBtn}
        >
            <FontAwesomeIcon 
                icon={isFavourited ? faHeartSolid : faHeartRegular}
                className={`${isFavourited ? styles.favourited : styles.heartIcon}`}
            />
        </button>
    )
};