import { getCategoryImage } from "../../../../utils/categoryImages.js";
import { useNavigate } from "react-router-dom";
import Icon from "../../../shared/Icon/Icon.jsx";
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category, className = '' }) => {
  const navigate = useNavigate();
  const imageSrc = getCategoryImage(category.name);

  return (
    <div className={`${styles.card} ${className}`}>
      <img src={imageSrc} alt={category.name} className={styles.image}/>
      <div className={styles.content}>
        <h3 className={`${styles.text} ${className}`}>{category.name}</h3>
        <button
          className={`${styles.button} ${className}`}
          onClick={() => navigate(`/categories/${category.name}`)}
        >
          <Icon
            id="icon-arrow-up-right"
            width={18}
            height={18}
          />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;