import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/PropertiesList.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import PropertyTypes from "./PropertyTypes";

export default function PropertiesList() {
    const [propertiesList, setPropertiesList] = useState([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
     const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const navigate = useNavigate();

    const sortByQuery = searchParams.get("sort");
    const orderQuery = searchParams.get("order"); 
    
    const [minPrice, setMinPrice] = useState(20);
    const [maxPrice, setMaxPrice] = useState(500);

    const isMostPopularChecked = sortByQuery === "popularity" && orderQuery === "desc";
    const isLeastPopularChecked = sortByQuery === "popularity" && orderQuery === "asc";
    const isHighestCostChecked = sortByQuery === "cost_per_night" && orderQuery === "desc";
    const isLowestCostChecked = sortByQuery === "cost_per_night" && orderQuery === "asc";

    function fetchProperties() {
        axios
            .get("https://be-airbnc-zw86.onrender.com/api/properties", {
            params: Object.fromEntries(searchParams.entries()),
          })
          .then((response) => {
            setPropertiesList(response.data.properties);
          })
          .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchProperties(); // Fetch all properties on initial load

        const minPriceFromQuery = searchParams.get("minprice");
        const maxPriceFromQuery = searchParams.get("maxprice");

        if (minPriceFromQuery) {
            setMinPrice(Number(minPriceFromQuery));
        };
        if (maxPriceFromQuery) {
            setMaxPrice(Number(maxPriceFromQuery));
        };

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

    function handleMinPriceSliderChange(e) {
        const newMinPrice = Number(e.target.value); 
        setMinPrice(newMinPrice); // update state

        const newParams = new URLSearchParams(searchParams); // create a copy of all existing search parameters, including sort options
        newParams.set("minprice", newMinPrice); // only update the minprice parameter
        setSearchParams(newParams); // searchParams now include both the existing parameters and the new min price
    };

    function handleMaxPriceSliderChange(e) {
        const newMaxPrice = Number(e.target.value);
        setMaxPrice(newMaxPrice);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("maxprice", newMaxPrice);
        setSearchParams(newParams);
    };

    function handleSubmit(e) {
        e.preventDefault();
        fetchProperties();
    };

    function handleFiltersBtnClick() {
        setIsFiltersOpen(!isFiltersOpen);
    };

    const uniquePropertyTypes = [];
    propertiesList.forEach(({ property_type }) => {
        if (!uniquePropertyTypes.includes(property_type)) {
            uniquePropertyTypes.push(property_type)
        }
    });
    
    return (
        <>
            <main>
                <section className={styles.filtersContainer}>
                    <div className={styles.leftSideFiltersContainer}>
                        <button
                            onClick={handleFiltersBtnClick} 
                            className={styles.filtersIcon} 
                            aria-label="Toggle filters"
                        >
                            <FontAwesomeIcon icon={faSliders} className={styles.bars}/>
                            Filters
                        </button>
                        {isFiltersOpen && (
                            <Filters 
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            isMostPopularChecked={isMostPopularChecked}
                            isLeastPopularChecked={isLeastPopularChecked}
                            isHighestCostChecked={isHighestCostChecked}
                            isLowestCostChecked={isLowestCostChecked}
                            handleSortOption={handleSortOption}
                            handleMinPriceSliderChange={handleMinPriceSliderChange}
                            handleMaxPriceSliderChange={handleMaxPriceSliderChange}
                            handleSubmit={handleSubmit}
                            setIsFiltersModalOpen={setIsFiltersModalOpen}
                            setIsFiltersOpen={setIsFiltersOpen}
                            />
                        )}
                    </div>
                    
                    <div className={styles.propertyTypesContainer}>
                        <PropertyTypes propertyType={uniquePropertyTypes} />
                    </div>
                </section>  

                <section>
                    <div className={styles.listContainer}>
                        {propertiesList.map(({ images, property_name, location, cost_per_night, property_id }) => (
                            <div 
                                key={property_id} 
                                className={styles.itemContainer}
                                onClick={() =>  handlePropertyCardClick(property_id)} 
                            >
                                <img 
                                    src={images[0]} 
                                    alt={property_name} 
                                    className={styles.itemImg}
                                />
                                <h3 className={styles.propertyName}>{property_name}</h3>
                                <p className={styles.propertyLocation}>{location}</p>
                                <p className={styles.propertyPrice}>£{cost_per_night} night</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
};