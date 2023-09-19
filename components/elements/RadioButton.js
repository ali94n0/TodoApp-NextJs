import React from "react";

function RadioButton({ title, value, status, setStatus, children }) {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        id={value}
        type="radio"
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
