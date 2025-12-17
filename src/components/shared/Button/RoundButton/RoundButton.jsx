import Icon from "../../Icon/Icon.jsx";
import css from "./RoundButton.module.css";

const RoundButton = ({ iconId, onClick }) => {
  return (
    <button className={css.container} onClick={onClick}>
      <Icon id={iconId} className={css.icon} />
    </button>
  );
}

export default RoundButton;
