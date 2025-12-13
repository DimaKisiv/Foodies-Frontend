import CategoryCard from '../CategoryCard/CategoryCard.jsx';
import styles from './CategoryList.module.css';

// Твій список "широких" категорій.
const WIDE_CATEGORIES = ["Breakfast", "Dessert", "Pork", "Side"];

// // Функція, яку ми передаємо вниз у CategoryList
// const handleCategoryClick = async (categoryName) => {
//     console.log(`User clicked: ${categoryName}`);
// };

const CategoryList = ({categories}) => {
  return (
    <div className={styles.gridContainer}>
      {categories.map((cat) => {

        const isWide = WIDE_CATEGORIES.includes(cat.name);

        const layoutClass = isWide ? styles.wideCard : '';

        return (
          <CategoryCard
            key={cat.id || cat._id}
            category={cat}
            onClick={() => {
            }}
            className={layoutClass} // Передаємо клас
          />
        );
      })}

      {/* Картка "All Categories" */}
      <div
        className={`${styles.card} ${styles.allCategoriesCard}`}
        onClick={() => {
        }}
      >
        <h3>All Categories</h3>
        <button className={styles.arrowBtn}>➔</button>
      </div>
    </div>
  );
};

export default CategoryList;


