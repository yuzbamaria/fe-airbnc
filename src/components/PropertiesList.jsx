import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/PropertiesList.module.css";

import Filters from "./Filters";
import PropertiesContainer from "./PropertiesContainer";
import PropertyTypes from "./PropertyTypes";

import useFetchProperties from "../hooks/useFetchProperties";
import useFilters from "../hooks/useFilters";
import usePropertyTypes from "../hooks/usePropertyTypes";

export default function PropertiesList({ propertiesRef }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { propertiesList, isLoading } = useFetchProperties(searchParams);
  const filters = useFilters(searchParams, setSearchParams);
  const {
    selectedPropertyType,
    handlePropertyTypeChange,
    displayedItems,
    uniquePropertyTypes,
  } = usePropertyTypes(propertiesList);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const navigate = useNavigate();

  function handlePropertyCardClick(propertyId) {
    // Navigate to property page
    navigate(`/property/${propertyId}`);
  }

  // Submit filters and trigger fetch
  const handleSubmit = (e) => {
    e.preventDefault();

    const newParams = new URLSearchParams();
    if (filters.minPrice !== 20) newParams.set("minprice", filters.minPrice);
    if (filters.maxPrice !== 500) newParams.set("maxprice", filters.maxPrice);
    if (filters.sort) newParams.set("sort", filters.sort);
    if (filters.order) newParams.set("order", filters.order);

    setSearchParams(newParams); // triggers API request
    setIsFiltersModalOpen(false); // close modal
  };

  return (
    <>
      <section className={styles.filtersContainer}>
        <div className={styles.leftSideFiltersContainer}>
          <button
            onClick={() => setIsFiltersModalOpen(true)}
            className={styles.filtersIcon}
            aria-label="Toggle filters"
          >
            <FontAwesomeIcon icon={faSliders} className={styles.bars} />
            Filters
          </button>

          {isFiltersModalOpen && (
            <Filters
              {...filters}
              setIsFiltersModalOpen={setIsFiltersModalOpen}
              handleSubmit={handleSubmit}
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
