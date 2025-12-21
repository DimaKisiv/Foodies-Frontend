import Avatar from "boring-avatars";
import css from "./AvatarButton.module.css";

const AvatarButton = ({ image, name, onClick }) => {
  return (
    <button className={css.container} onClick={onClick}>
      {image ? (
        <img src={image} alt={name} loading="lazy" decoding="async" />
      ) : (
        <Avatar name={name} size={40} variant="pixel" />
      )}
    </button>
  );
};

export default AvatarButton;
