import styles from "./styles/Filters.module.css";

export default function Filters({
  minPrice,
  maxPrice,
  sort, 
  order,
  handleSortOption,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleSubmit,
  setIsFiltersModalOpen,
  handleClearFilters,
}) {
  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return (
    <>
      <div className={styles.openFiltersModal}>
        <div className={styles.openFiltersSection}>
          <div className={styles.openFiltersModalTop}>
            <p className={styles.filtersHeading}>Filters</p>
            <span
              className={styles.closeFiltersModalIcon}
              onClick={handleCloseFiltersModal}
            >
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit} className={styles.openFiltersContainer}>
            <div className={styles.sortingContainer}>
              <p className={styles.sortContainerHeading}>Sort by</p>
              <label className={styles.sortOption}>
                <input
                  type="radio"
                  name="radio"
                  checked={sort === "popularity" && order === "desc"}
                  onChange={() => handleSortOption("popularity", "desc")}
                  className={styles.inputStyling}
                />
                <span className={styles.sortOptionText}>Most popular</span>
              </label>
              <label className={styles.sortOption}>
                <input
                  type="radio"
                  name="radio"
                  checked={sort === "popularity" && order === "asc"}
                  onChange={() => handleSortOption("popularity", "asc")}
                  className={styles.inputStyling}
                />
                <span className={styles.sortOptionText}>Least popular</span>
              </label>
              <label className={styles.sortOption}>
                <input
                  type="radio"
                  name="radio"
                  checked={sort === "cost_per_night" && order === "desc"}
                  onChange={() => handleSortOption("cost_per_night", "desc")}
                  className={styles.inputStyling}
                />
                <span className={styles.sortOptionText}>Highest cost</span>
              </label>
              <label className={styles.sortOption}>
                <input
                  type="radio"
                  name="radio"
                  checked={sort === "cost_per_night" && order === "asc"}
                  onChange={() => handleSortOption("cost_per_night", "asc")}
                  className={styles.inputStyling}
                />
                <span className={styles.sortOptionText}>Lowest cost</span>
              </label>
            </div>
            <div className={styles.slidersContainer}>
              <p className={styles.slidersHeading}>Price</p>
              <p className={styles.slidersText}>Minimum price £{minPrice}</p>
              <input
                type="range"
                min="20"
                max="500"
                value={minPrice}
                onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                className={styles.slider}
              />
              <p className={styles.slidersText}>Maximum price £{maxPrice}</p>
              <input
                type="range"
                min="20"
                max="500"
                value={maxPrice}
                onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                className={styles.slider}
              />
            </div>
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.clearFiltersBtn}
                onClick={() => {
                  handleClearFilters();
                  setIsFiltersModalOpen(false);
                }}
              >
                Clear all
              </button>
              <input
                type="submit"
                value="View results"
                className={styles.filtersSubmitBtn}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
