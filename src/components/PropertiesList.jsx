import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/PropertiesList.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PropertiesList() {
    const [propertiesList, setPropertiesList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const sortByQuery = searchParams.get("sort");
    const orderQuery = searchParams.get("order");   

    const isMostPopularChecked = sortByQuery === "popularity" && orderQuery === "desc";
    const isLeastPopularChecked = sortByQuery === "popularity" && orderQuery === "asc";
    const isHighestCostChecked = sortByQuery === "cost_per_night" && orderQuery === "desc";
    const isLowestCostChecked = sortByQuery === "cost_per_night" && orderQuery === "asc";

    function fetchProperties() {
        const query = searchParams.toString();
        const url = query
          ? `https://be-airbnc-zw86.onrender.com/api/properties?${query}`
          : "https://be-airbnc-zw86.onrender.com/api/properties";
        axios
          .get(url)
          .then((response) => {
            setPropertiesList(response.data.properties);
          })
          .catch((error) => {
            console.error(error);
          });
    };
    
    useEffect(() => {
        fetchProperties()
    }, [searchParams]);    

    function handleSortOption(sort, order) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort", sort);
        newParams.set("order", order);
        setSearchParams(newParams);
    };

    function handlePropertyCardClick(propertyId) {
        navigate(`/property/${propertyId}`)
    };
    
    return (
        <>
            <main>
                <section>
                    <div>
                        {/* Sorting */}
                        <p>Sort by</p>
                        <label className="container">Most popular
                            <input type="radio" name="radio" checked={isMostPopularChecked} onChange={() => handleSortOption("popularity", "desc")}/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">Least popular
                            <input type="radio" name="radio" checked={isLeastPopularChecked} onChange={() => handleSortOption("popularity", "asc")}/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">Highest cost
                            <input type="radio" checked={isHighestCostChecked} name="radio" onChange={() => handleSortOption("cost_per_night", "desc")}/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">Lowest cost
                            <input type="radio" checked={isLowestCostChecked} name="radio" onChange={() => handleSortOption("cost_per_night", "asc")}/>
                            <span className="checkmark"></span>
                        </label>

                    </div>
                    <div className={styles.listContainer}>
                        {propertiesList.map(({ image, property_name, location, price_per_night, property_id }) => (
                            <div 
                                key={property_id} 
                                className={styles.itemContainer}
                                onClick={() =>  handlePropertyCardClick(property_id)} 
                            >
                                <img src={image} alt={property_name} className={styles.itemImg}/>
                                <h3 className={styles.propertyName}>{property_name}</h3>
                                <p className={styles.propertyLocation}>{location}</p>
                                <p className={styles.propertyPrice}>£{price_per_night} night</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
};