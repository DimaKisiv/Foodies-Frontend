import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ size = 32, color = "#2BB178", className = "" }) => {
  const style = {
    width: size,
    height: size,
    borderColor: `${color}40`,
    borderTopColor: color,
  };

  return (
    <span
      className={`${styles.spinner} ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  );
};

export default Loader;
