import { useState } from "react";
import { getTrackBackground, Range } from "react-range";
import { useLocation } from "react-router-dom";

const PriceRange = ({
  values,
  setValues,
  setSearchParams,
  currentSearchParams,
  newQueryParameters,
}) => {
  const location = useLocation();
  const priceMin = currentSearchParams.get("priceMin");
  const priceMax = currentSearchParams.get("priceMax");
  let rangeArr;

  if (priceMin && priceMax) rangeArr = [priceMin, priceMax];
  const [rangeValues, setRangeValues] = useState(rangeArr || [0, 1000]);

  const min = 0;
  const max = 1000;
  const step = 50;
  return (
    <Range
      label="Select your value"
      step={step}
      min={min}
      max={max}
      values={rangeValues}
      onChange={(values) => {
        setRangeValues(values);
      }}
      onFinalChange={() => {
        setValues(values);
        if (location.search) {
          setSearchParams((prev) => {
            prev.set("priceMin", values[0]);
            prev.set("priceMax", values[1]);
            return prev;
          });
        } else {
          newQueryParameters.set("priceMin", values[0]);
          newQueryParameters.set("priceMax", values[1]);
          setSearchParams(newQueryParameters);
        }
      }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            display: "flex",
            borderRadius: "5px",
            backgroundColor: "lightgray",
          }}>
          <div
            ref={props.ref}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors: ["lightgray", "#007782", "lightgray"],
                min: min,
                max: max,
              }),
              alignSelf: "center",
            }}></div>
          {children}
        </div>
      )}
      renderThumb={({ index, props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            backgroundColor: "#007782",
            border: "1px solid white",
          }}>
          <span className="price-tag">{rangeValues[index]}</span>
        </div>
      )}
    />
  );
};

export default PriceRange;
