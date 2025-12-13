import styles from "../RecipeInfo.module.css";

export default function RecipeIngredients({ ingredients }) {
  return (
    <>
      <h3 className={styles["section-header"]}>Ingredients</h3>
      <div className={styles["ingredients-grid"]}>
        {ingredients.map((ingredient) => {
          return (
            <div key={ingredient.id} className={styles.ingredient}>
              <img src={ingredient.img} width="55" height="55" />
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
