import styles from "../RecipeInfo.module.css";

export default function RecipePreparation({ instructions, isFavorite }) {
  const handleFavoritesChange = () => {};

  return (
    <>
      <h3 className={styles["section-header"]}>Recipe Preparation</h3>
      <p className={styles.description}>{instructions}</p>

      {/* TODO change text and probably styles when recipe is favorite */}
      <button
        className={styles["favorites-button"]}
        onClick={handleFavoritesChange}
      >
        Add to favorites
      </button>
    </>
  );
}
