// src/pages/UserPage/ListItems/RecipePreview/RecipePreview.jsx
import styles from "./RecipePreview.module.css";

export function RecipePreview({
  recipe,
  onOpen,
  onDelete,
  showActions = true,
}) {
  // template-only
  const title = recipe?.title ?? "RECIPE TITLE";
  const description =
    recipe?.description ?? "Short description / instructions preview…";
  const img = recipe?.thumbUrl; // optional

  return (
    <article className={styles.item}>
      <div className={styles.left}>
        <div className={styles.thumb}>
          {img ? <img className={styles.img} src={img} alt={title} /> : null}
        </div>

        <div className={styles.text}>
          <div className={styles.name}>{title}</div>
          <div className={styles.desc}>{description}</div>
        </div>
      </div>

      {showActions ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onOpen}
            title="Open"
          >
            ↗
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onDelete}
            title="Delete"
          >
            🗑
          </button>
        </div>
      ) : null}
    </article>
  );
}
