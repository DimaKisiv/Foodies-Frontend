import Icon from "../../Icon/Icon.jsx";
import css from "./RoundButton.module.css";

const RoundButton = ({ iconId, onClick, altMode }) => {
  return (
    <button
      className={altMode ? `${css.container} ${css.alt}` : css.container}
      onClick={onClick}
    >
      <Icon id={iconId} className={css.icon} />
    </button>
  );
}

export default RoundButton;
