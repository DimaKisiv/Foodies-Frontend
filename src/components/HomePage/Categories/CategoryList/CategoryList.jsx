import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard.jsx";
import styles from "./CategoryList.module.css";

const DESKTOP_WIDE_CATEGORIES = [2, 3, 7, 9];
const TABLET_WIDE_CATEGORIES = [2, 7];
const TABLET_BREAKPOINT = 768;

const CategoryList = ({ categories }) => {
  const [showAll, setShowAll] = useState(false);

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(
        window.innerWidth >= TABLET_BREAKPOINT && window.innerWidth < 1440
      );
    };

    checkTablet();

    window.addEventListener("resize", checkTablet);

    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  const currentWideCategories = isTablet
    ? TABLET_WIDE_CATEGORIES
    : DESKTOP_WIDE_CATEGORIES;

  return (
    <ul className={styles.gridContainer}>
      {(showAll ? categories : categories.slice(0, 11)).map((category, i) => {
        const layoutClass = currentWideCategories.includes(i)
          ? styles.wideCard
          : "";
        return (
          <li key={category.id} className={layoutClass}>
            <CategoryCard category={category} className={layoutClass} />
          </li>
        );
      })}
        <button className={styles.card} onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "All Categories"}
        </button>
    </ul>
  );
};

export default CategoryList;
