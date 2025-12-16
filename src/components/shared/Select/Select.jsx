import { useState } from "react";
import Icon from "../Icon/Icon.jsx";
import css from "./Select.module.css";

const Select = ({ id, name, options, onChange, label = "" }) => {
  const [ isArrowUp, setIsArrowUp ] = useState(false);

  return (
    <div className={css.wrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={css.select}
        id={id}
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
        onClick={() => setIsArrowUp(!isArrowUp)}
        onBlur={() => setIsArrowUp(false)}
      >
        <option value="" disabled hidden>{name}</option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <Icon
        id="icon-chevron-down"
        className={isArrowUp ? `${css.selectArrow} ${css.selectArrowUp}` : css.selectArrow}
      />
    </div>
  );
}

export default Select;
