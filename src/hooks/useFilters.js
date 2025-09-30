import { useState } from "react";

const DEFAULT_MIN_PRICE = 20;
const DEFAULT_MAX_PRICE = 500;

export default function useFilters(searchParams, setSearchParams) {
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  const handleSortOption = (newSort, newOrder) => {
    setSort(newSort);
    setOrder(newOrder);
  };

  const handleMinPriceChange = (value) => setMinPrice(value);
  const handleMaxPriceChange = (value) => setMaxPrice(value);

  function handleClearFilters() {
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setSort("");
    setOrder("");
    setSearchParams("");
  }

  return {
    minPrice,
    maxPrice,
    sort,
    order,
    handleSortOption,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleClearFilters,
  };
}
