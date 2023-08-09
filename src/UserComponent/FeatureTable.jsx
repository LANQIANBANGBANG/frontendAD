import React from "react";

export const FeatureTable = ({ newRecord, handleFeaturesChange }) => {
  const featureRows = newRecord.recordFeatures.reduce((acc, feature, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc.push([]);
    }
    acc[rowIndex].push(feature);
    return acc;
  }, []);

  return (
    <div>
      <h4>Features Form</h4>
      {featureRows.map((rowFeatures, rowIndex) => (
        <div key={rowIndex} className="feature-row">
          {rowFeatures.map((feature) => (
            <div key={feature.name} className="feature-item">
              <label htmlFor={feature.name} className="feature-label">
                {feature.label}
              </label>
              {feature.type === "select" ? (
                <select
                  name={feature.name}
                  id={feature.name}
                  value={feature.value}
                  className="form-control"
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
          ))}
        </div>
      ))}
    </div>
  );
};
