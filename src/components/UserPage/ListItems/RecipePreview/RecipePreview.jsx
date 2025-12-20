// src/components/UserPage/ListItems/RecipePreview/RecipePreview.jsx
import Icon from "../../../shared/Icon/Icon";
import { Link } from "react-router-dom";
import styles from "./RecipePreview.module.css";

export const RecipePreview = ({ recipe, onOpen, onDelete }) => {
  const title = recipe?.title || "Untitled recipe";
  const description = recipe?.description || recipe?.instructions || "";
  const imgSrc = recipe?.thumb || recipe?.thumbUrl || recipe?.image || "";
  const to = recipe?.id ? `/recipe/${recipe.id}` : "/recipe";

  return (
    <article className={styles.item}>
      <div className={styles.left}>
        <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
          <div className={styles.thumb}>
            {imgSrc ? (
              <img className={styles.img} src={imgSrc} alt={title} />
            ) : (
              <div className={styles.imgFallback} aria-hidden="true" />
            )}
          </div>
        </Link>

        <div className={styles.text}>
          <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
            <h4 className={styles.name} title={title}>
              {title}
            </h4>
          </Link>
          {!!description && <p className={styles.desc}>{description}</p>}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onOpen}
          aria-label="Open recipe"
        >
          <Icon id="icon-arrow-up-right" width={16} height={16} />
        </button>

        <button
          type="button"
          className={styles.iconBtn}
          onClick={onDelete}
          aria-label="Remove from favorites"
        >
          <Icon id="icon-trash" width={16} height={16} />
        </button>
      </div>
    </article>
  );
};
