import React from "react";

function FormInput({ label, type, name, value, onChange, error, ...rest }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 5 }}>
        {label}
      </label>
      <input
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...rest}
      />
      {error && (
        <div style={{ color: "#e74c3c", marginTop: 3, fontSize: "0.97rem" }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default FormInput;
