import CategoryCard from '../CategoryCard/CategoryCard.jsx';
import styles from './CategoryList.module.css';
import { useState } from "react";


const WIDE_CATEGORIES = [2, 3, 7, 9];

const CategoryList = ({categories}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className={styles.gridContainer}>
      {(showAll ? categories : categories.slice(0, 11)).map((category, i) => {
        const layoutClass = WIDE_CATEGORIES.includes(i) ? styles.wideCard : '';

        return (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => {
            }}
            className={layoutClass}
          />
        );
      })}
      <button
        className={styles.card}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show less" : "All Categories"}
      </button>
    </div>
  );
};

export default CategoryList;