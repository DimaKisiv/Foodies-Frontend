import styles from "../RecipeInfo.module.css";
import { useNavigate } from "react-router-dom";

export default function RecipeMainInfo({ recipe, owner }) {
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(`/user/${owner.id}`);
  };

  return (
    <>
      <h3 className={styles["title"]}>{recipe.title}</h3>
      <ul className={styles["tags-list"]}>
        <li key="category" className={styles.tag}>
          {recipe.category}
        </li>
        <li key="time" className={styles.tag}>
          {recipe.time} min
        </li>
      </ul>

      <p className={styles.description}>{recipe.description}</p>

      <RecipeAuthor author={owner} onClick={handleUserClick} />
    </>
  );
}

const RecipeAuthor = ({ author, onClick }) => {
  return (
    <button className={styles.author} onClick={onClick}>
      <img className={styles["author-avatar"]} src={author.avatar} />
      <div className={styles["author-name-layout"]}>
        <p className={styles["author-created-by-text"]}>Created by:</p>
        <p className={styles["author-name"]}>{author.name}</p>
      </div>
    </button>
  );
};
