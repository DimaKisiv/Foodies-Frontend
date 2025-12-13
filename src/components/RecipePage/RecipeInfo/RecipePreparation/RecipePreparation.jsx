import styles from "../RecipeInfo.module.css";

export default function RecipePreparation({
  instructions,
  isFavorite,
  onFavoriteClick,
}) {
  return (
    <>
      <h3 className={styles["section-header"]}>Recipe Preparation</h3>
      <p className={styles.description}>{instructions}</p>

      <button
        className={
          styles[
            isFavorite
              ? "remove-from-favorites-button"
              : "add-to-favorites-button"
          ]
        }
        onClick={onFavoriteClick}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </>
  );
}
