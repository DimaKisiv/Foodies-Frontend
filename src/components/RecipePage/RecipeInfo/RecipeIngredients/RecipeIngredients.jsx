import styles from "../RecipeInfo.module.css";
import foodPlaceholder from "../../../../assets/ingredient.png";

export default function RecipeIngredients({ ingredients }) {
  return (
    <>
      <h3 className={styles["section-header"]}>Ingredients</h3>
      <div className={styles["ingredients-grid"]}>
        {ingredients.map((ingredient) => {
          return (
            <div key={ingredient.id} className={styles.ingredient}>
              <img
                src={ingredient?.img || foodPlaceholder}
                alt={ingredient?.name || "Ingredient"}
                width="55"
                height="55"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = foodPlaceholder;
                }}
              />
              <div>
                <p className={styles["ingredient-name"]}>{ingredient.name}</p>
                <p className={styles["ingredient-measure"]}>
                  {ingredient.measure}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
