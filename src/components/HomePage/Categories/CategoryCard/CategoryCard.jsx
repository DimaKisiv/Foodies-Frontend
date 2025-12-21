import { getCategoryImage } from "../../../../utils/categoryImages.js";
import { Link } from "react-router-dom";
import Icon from "../../../shared/Icon/Icon.jsx";
import ResponsiveImage from "../../../shared/ResponsiveImage/ResponsiveImage.jsx";
import styles from "./CategoryCard.module.css";
import foodPlaceholder from "../../../../assets/food.png";

const CategoryCard = ({ category, className = "" }) => {
  const imageSrc = getCategoryImage(category.name);
  const to = `/?category=${encodeURIComponent(category.name)}`;

  return (
    <Link to={to} className={styles.link} aria-label={category.name}>
      <div className={`${styles.card} ${className}`}>
        <ResponsiveImage
          src={imageSrc}
          fallbackSrc={foodPlaceholder}
          alt={category.name}
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={`${styles.text} ${className}`}>{category.name}</h3>
          <span className={`${styles.button} ${className}`} aria-hidden="true">
            <Icon
              id="icon-arrow-up-right"
              width={18}
              height={18}
              className={styles.icon}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
