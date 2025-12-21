// src/components/UserPage/ListItems/RecipePreview/RecipePreview.jsx
import { Link } from "react-router-dom";
import styles from "./RecipePreview.module.css";
import foodPlaceholder from "../../../../assets/food.png";
import ResponsiveImage from "../../../shared/ResponsiveImage/ResponsiveImage";
import Icon from "../../../shared/Icon/Icon";

export const RecipePreview = ({ recipe, onOpen, onDelete }) => {
  const title = recipe?.title || "Untitled recipe";
  const description = recipe?.description || recipe?.instructions || "";
  const imgSrc = recipe?.thumb || recipe?.thumbUrl || recipe?.image || "";
  const to = recipe?.id ? `/recipe/${recipe.id}` : null;

  return (
    <article className={styles.item}>
      <div className={styles.left}>
        {to ? (
          <Link to={to} className={styles.link}>
            <div className={styles.thumb}>
              {imgSrc ? (
                <ResponsiveImage
                  className={styles.img}
                  src={imgSrc}
                  fallbackSrc={foodPlaceholder}
                  alt={title}
                />
              ) : (
                <div className={styles.imgFallback} aria-hidden="true" />
              )}
            </div>
          </Link>
        ) : (
          <div className={styles.thumb}>
            {imgSrc ? (
              <ResponsiveImage
                className={styles.img}
                src={imgSrc}
                fallbackSrc={foodPlaceholder}
                alt={title}
              />
            ) : (
              <div className={styles.imgFallback} aria-hidden="true" />
            )}
          </div>
        )}

        <div className={styles.text}>
          {to ? (
            <Link to={to} className={styles.link}>
              <h4 className={styles.name} title={title}>
                {title}
              </h4>
            </Link>
          ) : (
            <h4 className={styles.name} title={title}>
              {title}
            </h4>
          )}
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
