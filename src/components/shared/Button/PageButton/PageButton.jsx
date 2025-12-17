import css from "./PageButton.module.css";

const PageButton = ({ pageNumber, isActive, onClick }) => {
  return (
    <button
      className={isActive ? `${css.container} ${css.active}` : css.container}
      onClick={(e) => onClick(Number(e.target.value))}
      value={pageNumber}
      disabled={isActive}
    >
      {pageNumber}
    </button>
  );
}

export default PageButton;
