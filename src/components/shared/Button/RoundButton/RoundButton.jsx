import Loader from "../../Loader/Loader.jsx";
import Icon from "../../Icon/Icon.jsx";
import css from "./RoundButton.module.css";

const RoundButton = ({ iconId, onClick, isLoading = false, altMode = false }) => {
  return (
    <button
      className={altMode ? `${css.container} ${css.alt}` : css.container}
      onClick={onClick}
    >
      {isLoading
        ? <div className={css.loader}>
            <Loader />
          </div>
        : <Icon id={iconId} className={css.icon}/>}
    </button>
  );
}

export default RoundButton;
