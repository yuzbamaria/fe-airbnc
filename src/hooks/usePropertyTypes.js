import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePropertyTypes(propertiesList) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  // initialize state from URL on first render
  useEffect(() => {
    const typeFromUrl = searchParams.get("propertyType");
    if (typeFromUrl) setSelectedPropertyType(typeFromUrl);
  }, [searchParams]);

  function handlePropertyTypeChange(e) {
    const type = e.currentTarget.innerText;
    const newType = selectedPropertyType === type ? "" : type;
    setSelectedPropertyType((prevType) => (prevType === type ? "" : type));

    // update URL
    const newParams = new URLSearchParams(searchParams);
    if (newType) newParams.set("propertyType", newType);
    else newParams.delete("propertyType"); // remove param if unselected
    setSearchParams(newParams);
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

  return { selectedPropertyType, handlePropertyTypeChange, displayedItems, uniquePropertyTypes };
}
