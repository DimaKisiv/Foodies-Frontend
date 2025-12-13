import styles from "../RecipeInfo.module.css";

export default function RecipeMainInfo({ recipe, owner }) {
  return (
    <>
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

      <RecipeAuthor author={owner} />
    </>
  );
}

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
