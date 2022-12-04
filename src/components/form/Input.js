import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, text, name, placeholder, handleOnChange, value, ...props }) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default Input;
