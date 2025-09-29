import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import styles from "./styles/PropertiesList.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import PropertiesContainer from "./PropertiesContainer";
import PropertyTypes from "./PropertyTypes";

const DEFAULT_MIN_PRICE = 20;
const DEFAULT_MAX_PRICE = 500;

export default function PropertiesList({ propertiesRef }) {
  const [propertiesList, setPropertiesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const sortByQuery = searchParams.get("sort");
  const orderQuery = searchParams.get("order");

  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);

  const isMostPopularChecked =
    sortByQuery === "popularity" && orderQuery === "desc";
  const isLeastPopularChecked =
    sortByQuery === "popularity" && orderQuery === "asc";
  const isHighestCostChecked =
    sortByQuery === "cost_per_night" && orderQuery === "desc";
  const isLowestCostChecked =
    sortByQuery === "cost_per_night" && orderQuery === "asc";

  function fetchProperties() {
    axios
      .get("https://be-airbnc-zw86.onrender.com/api/properties", {
        params: Object.fromEntries(searchParams.entries()),
      })
      .then((response) => {
        setPropertiesList(response.data.properties);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProperties(); // Fetch all properties on initial load

    const minPriceFromQuery = searchParams.get("minprice");
    const maxPriceFromQuery = searchParams.get("maxprice");

    if (minPriceFromQuery) setMinPrice(Number(minPriceFromQuery));
    if (maxPriceFromQuery) setMaxPrice(Number(maxPriceFromQuery));
  }, []);

  function handleSortOption(sort, order) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", sort);
    newParams.set("order", order);
    setSearchParams(newParams);
  }

  function handlePropertyCardClick(propertyId) {
    navigate(`/property/${propertyId}`);
  }

  function updateSearchParam(key, value) {
    const newParams = new URLSearchParams(searchParams); // create a copy of all existing search parameters, including sort options
    newParams.set(key, value); // only update the minprice/maxprice parameter
    setSearchParams(newParams); // searchParams now include both the existing parameters and the new min / max price
  }

  function handleMinPriceSliderChange(e) {
    const newMinPrice = Number(e.target.value);
    setMinPrice(newMinPrice); // update state
    updateSearchParam("minprice", newMinPrice);
  }

  function handleMaxPriceSliderChange(e) {
    const newMaxPrice = Number(e.target.value);
    setMaxPrice(newMaxPrice);
    updateSearchParam("maxprice", newMaxPrice);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchProperties();
  }

  function handleFiltersBtnClick() {
    setIsFiltersModalOpen(true);
  }

  function handlePropertyTypeChange(e) {
    const type = e.currentTarget.innerText;
    setSelectedPropertyType((prevType) => (prevType === type ? "" : type));
  }

  const displayedItems = selectedPropertyType
    ? propertiesList.filter(
        (item) => item.property_type === selectedPropertyType
      )
    : propertiesList;

  const uniquePropertyTypes = useMemo(() => {
    const types = new Set(propertiesList.map((p) => p.property_type));
    return [...types]; // spread the Set into an array
  }, [propertiesList]);

  function handleClearFilters() {
    setSearchParams("");
    setMinPrice(20);
    setMaxPrice(500);
  }

  return (
    <>
      <section className={styles.filtersContainer}>
        <div className={styles.leftSideFiltersContainer}>
          <button
            onClick={handleFiltersBtnClick}
            className={styles.filtersIcon}
            aria-label="Toggle filters"
          >
            <FontAwesomeIcon icon={faSliders} className={styles.bars} />
            Filters
          </button>

          {isFiltersModalOpen && (
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
              handleClearFilters={handleClearFilters}
            />
          )}
        </div>

        <PropertyTypes
          isLoading={isLoading}
          propertyTypes={uniquePropertyTypes}
          handlePropertyTypeChange={handlePropertyTypeChange}
          selectedPropertyType={selectedPropertyType}
        />
      </section>

      <section>
        <PropertiesContainer
          properties={displayedItems}
          onCardClick={handlePropertyCardClick}
          isLoading={isLoading}
          propertiesRef={propertiesRef}
        />
      </section>
    </>
  );
}
