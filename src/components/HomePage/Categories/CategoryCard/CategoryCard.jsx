import { getCategoryImage } from "../../../../utils/categoryImages.js";
import { Link } from "react-router-dom";
import Icon from "../../../shared/Icon/Icon.jsx";
import styles from './CategoryCard.module.css';
import foodPlaceholder from "../../../../assets/food.png";

const CategoryCard = ({ category, className = '' }) => {
  const imageSrc = getCategoryImage(category.name);
  const to = `/categories/${category.name}`;

  return (
    <div className={`${styles.card} ${className}`}>
      <Link
        to={to}
        style={{ display: "contents", color: "inherit", textDecoration: "none" }}
        aria-label={category.name}
      >
        <img
          src={imageSrc || foodPlaceholder}
          alt={category.name}
          className={styles.image}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = foodPlaceholder;
          }}
        />
        <div className={styles.content}>
          <h3 className={`${styles.text} ${className}`}>{category.name}</h3>
          <Link
            to={to}
            className={`${styles.button} ${className}`}
            aria-label={`Open ${category.name}`}
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            <Icon
              id="icon-arrow-up-right"
              width={18}
              height={18}
              style={{ transform: "scale(1.08)", filter: "drop-shadow(0 0 0 currentColor)" }}
            />
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;