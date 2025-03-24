import styles from "./styles/Filters.module.css";

export default function Filters({
    minPrice,
    maxPrice,
    isMostPopularChecked,
    isLeastPopularChecked,
    isHighestCostChecked,
    isLowestCostChecked,
    handleSortOption,
    handleMinPriceSliderChange,
    handleMaxPriceSliderChange,
    handleSubmit,
    setIsFiltersModalOpen,
    setIsFiltersOpen
}) {
    
    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(true);
        setIsFiltersOpen(false);
    }
    return (
        <>
            <div className={styles.openFiltersModal}>
                <div className={styles.openFiltersSection}>
                    <div className={styles.openFiltersModalTop}>
                        <p className={styles.filtersHeading}>Filters</p>
                        <span className={styles.closeFiltersModalIcon} onClick={handleCloseFiltersModal}>&times;</span>
                    </div>
                    <form 
                        onSubmit={handleSubmit}
                        className={styles.openFiltersContainer}
                    >   
                        <div className={styles.sortingContainer}>
                            <p className={styles.sortContainerHeading}>Sort by</p>
                            <label className={styles.sortOption}>
                                <input 
                                    type="radio" 
                                    name="radio" 
                                    checked={isMostPopularChecked} 
                                    onChange={() => handleSortOption("popularity", "desc")}
                                    className={styles.inputStyling}
                                />
                                <span className={styles.sortOptionText}>Most popular</span>
                            </label>
                            <label className={styles.sortOption}>
                                <input 
                                    type="radio" 
                                    name="radio" 
                                    checked={isLeastPopularChecked} 
                                    onChange={() => handleSortOption("popularity", "asc")}
                                    className={styles.inputStyling}
                                />
                                <span className={styles.sortOptionText}>Least popular</span>
                            </label>
                            <label className={styles.sortOption}>
                                <input 
                                    type="radio" 
                                    checked={isHighestCostChecked} 
                                    name="radio" 
                                    onChange={() => handleSortOption("cost_per_night", "desc")}
                                    className={styles.inputStyling}
                                />
                                <span className={styles.sortOptionText}>Highest cost</span>
                            </label>
                            <label className={styles.sortOption}>
                                <input 
                                    type="radio" 
                                    checked={isLowestCostChecked} 
                                    name="radio" 
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
                                min="20" max="500" 
                                value={minPrice}
                                onChange={handleMinPriceSliderChange}
                                className={styles.slider}
                                />
                            <p className={styles.slidersText}>Maximum price £{maxPrice}</p>
                            <input 
                                type="range" 
                                min="20" 
                                max="500" 
                                value={maxPrice}
                                onChange={handleMaxPriceSliderChange}
                                className={styles.slider}
                                />
                        </div>
                        <input 
                            type="submit" 
                            value="View results" 
                            className={styles.filtersSubmitBtn}
                        />
                    </form>
                </div>
            </div>
            
        </>
            
    )
};