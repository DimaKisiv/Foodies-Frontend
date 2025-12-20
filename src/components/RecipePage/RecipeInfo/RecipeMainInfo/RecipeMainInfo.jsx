import styles from "../RecipeInfo.module.css";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from "../../../../assets/profile.png";

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
      <img
        className={styles["author-avatar"]}
        src={author?.avatar || author?.avatarURL || profilePlaceholder}
        alt={author?.name || "Author"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = profilePlaceholder;
        }}
      />
      <div className={styles["author-name-layout"]}>
        <p className={styles["author-created-by-text"]}>Created by:</p>
        <p className={styles["author-name"]}>{author.name}</p>
      </div>
    </button>
  );
};
