import React from "react";

export const FeatureTable = ({ newRecord, handleFeaturesChange }) => {
  return (
    <div>
      <h4 className="m-2">Features Form</h4>
      {newRecord.recordFeatures.map((feature) => (
        <div key={feature.name} className="row mt-3">
          <div>
            <label htmlFor={feature.name}>{feature.label}</label>
            {feature.type === "select" ? (
              <select
                className="form-control"
                name={feature.name}
                id={feature.name}
                value={feature.value}
                onChange={(e) =>
                  handleFeaturesChange(feature.name, e.target.value)
                }
              >
                <option value="">Select an option</option>
                {feature.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form-control"
                type={feature.type}
                name={feature.name}
                id={feature.name}
                value={feature.value}
                onChange={(e) =>
                  handleFeaturesChange(feature.name, e.target.value)
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
