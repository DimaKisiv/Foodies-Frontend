import { useState } from "react";
import Loader from "../Loader/Loader.jsx";
import Icon from "../Icon/Icon.jsx";
import css from "./Select.module.css";

const Select = ({ id, name, options, onChange, isLoading = false, label = "" }) => {
  const [ isArrowUp, setIsArrowUp ] = useState(false);

  const changeHandler = (e) => {
    onChange({
      value: e.target.value,
      name: e.target[e.target.selectedIndex].getAttribute('data-name')
    });
  }

  return (
    <div className={css.container}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={css.select}
        id={id}
        defaultValue=""
        onChange={changeHandler}
        onClick={() => setIsArrowUp(!isArrowUp)}
        onBlur={() => setIsArrowUp(false)}
        disabled={isLoading}
      >
        <option value="">{name}</option>
        {options.map(({ id, name }) => (
          <option
            key={id}
            value={id}
            data-name={name}
          >
            {name}
          </option>
        ))}
      </select>
      {isLoading
        ? <div className={css.loader}>
            <Loader />
          </div>
        : <Icon
            id="icon-chevron-down"
            className={isArrowUp ? `${css.selectArrow} ${css.selectArrowUp}` : css.selectArrow}
          />}
    </div>
  );
}

export default Select;
