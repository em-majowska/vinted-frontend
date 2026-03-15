import { getTrackBackground, Range } from "react-range";

const PriceRange = ({ values, setValues }) => {
  const min = 0;
  const max = 200;
  const step = 10;
  return (
    <Range
      label="Select your value"
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(values) => setValues(values)}
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
          <span className="price-tag">{values[index]}</span>
        </div>
      )}
    />
  );
};

export default PriceRange;
