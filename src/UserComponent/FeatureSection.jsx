import { useState } from "react";

export const FeatureSection = ({
  title,
  attributes,
  newRecord,
  handleFeaturesChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="row mt-3">
      <div className="col">
        <button
          className="btn btn-link"
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          {expanded ? "Collapse" : "Expand"}
          {title}
        </button>
      </div>
      {expanded && (
        <div className="col">
          {attributes.map((attribute, index) => (
            <div key={index} className="row mt-3">
              <div>
                <label htmlFor={attribute}>{attribute}</label>
                <input
                  type="text"
                  className="form-control"
                  name={attribute}
                  id={attribute}
                  value={newRecord.recordFeatures[attribute]}
                  onChange={handleFeaturesChange}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
