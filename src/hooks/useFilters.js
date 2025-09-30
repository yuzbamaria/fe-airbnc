import { useState, useEffect } from "react";

const DEFAULT_MIN_PRICE = 20;
const DEFAULT_MAX_PRICE = 500;

export default function useFilters(searchParams, setSearchParams) {
  // initialize state from URL if present, otherwise use defaults
  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minprice")) || DEFAULT_MIN_PRICE
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxprice")) || DEFAULT_MAX_PRICE
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "");

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
    setSearchParams(""); // clears URL params
  }

  // Read from URL params whenever they change
  useEffect(() => {
    const min = searchParams.get("minprice");
    const max = searchParams.get("maxprice");
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");

    if (min) setMinPrice(Number(min));
    if (max) setMaxPrice(Number(max));
    if (sort) setSort(sort);
    if (order) setOrder(order);
  }, [searchParams]);

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
