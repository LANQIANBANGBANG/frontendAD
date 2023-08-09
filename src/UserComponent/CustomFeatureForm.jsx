import { useState } from "react";

export const CustomFeatureForm = ({ onAddFeature, onCancel }) => {
  const [customFeatureName, setCustomFeatureName] = useState("");
  const [customFeatureValue, setCustomFeatureValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFeature({
      name: customFeatureName,
      value: customFeatureValue,
      label: customFeatureName,
      type: "text",
    });

    setCustomFeatureName("");
    setCustomFeatureValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="customFeatureName">Feature Name</label>
            <input
              className="form-control"
              type="text"
              id="customFeatureName"
              value={customFeatureName}
              onChange={(e) => setCustomFeatureName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="customFeatureValue">Feature Value</label>
            <input
              className="form-control"
              type="text"
              id="customFeatureValue"
              value={customFeatureValue}
              onChange={(e) => setCustomFeatureValue(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="button-group">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit Custom Feature
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};
