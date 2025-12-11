import styles from "./RecipeInfo.module.css";

const RecipeInfo = ({ recipe }) => {
  const handleFavoritesChange = () => {};

  return (
    <div className={styles.recipe}>
      <img className={styles["thumb"]} src={recipe.thumb} />

      <h3 className={styles["section-header"]}>{recipe.title}</h3>
      <ul className={styles["tags-list"]}>
        <li key="category" className={styles.tag}>
          {recipe.category}
        </li>
        <li key="time" className={styles.tag}>
          {recipe.time} min
        </li>
      </ul>

      <p className={styles.description}>{recipe.description}</p>

      <RecipeAuthor author={recipe.owner} />

      <h3 className={styles["section-header"]}>Ingredients</h3>
      <div className={styles["ingredients-grid"]}>
        {recipe.ingredientsDetailed.map((ingredient) => {
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

      <h3 className={styles["section-header"]}>Recipe Preparation</h3>
      <p className={styles.description}>{recipe.instructions}</p>

      {/* TODO change text and probably styles when recipe is favorite */}
      <button
        className={styles["favorites-button"]}
        onClick={handleFavoritesChange}
      >
        Add to favorites
      </button>
    </div>
  );
};

// /avatars/3fc594ab58eb619b041eb72d_1765489692581.jpeg
// https://www.gravatar.com/avatar/b9e75194e4348c430fe0e4d5f7d900fd
const RecipeAuthor = ({ author }) => {
  // TODO handling for empty/invalid URL
  return (
    <div className={styles.author}>
      <img className={styles["author-avatar"]} src={author.avatar} />
      <div className={styles["author-name-layout"]}>
        <p className={styles["author-created-by-text"]}>Created by:</p>
        <p className={styles["author-name"]}>{author.name}</p>
      </div>
    </div>
  );
};

export default RecipeInfo;
