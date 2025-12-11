import sprite from "../../../assets/icons/sprite.svg";

const Icon = ({ id, width = 20, height = 20, className = "", ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
