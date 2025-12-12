import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './CategoryList.module.css';

// Твій список "широких" категорій.
const WIDE_CATEGORIES = ["Breakfast", "Dessert", "Pork", "Side"];

const CategoryList = ({categories = [], onCategorySelect}) => {
    return (
        <div className={styles.gridContainer}>
            {categories.map((cat) => {

                const isWide = WIDE_CATEGORIES.includes(cat.name);

                const layoutClass = isWide ? styles.wideCard : '';

                return (
                    <CategoryCard
                        key={cat.id || cat._id}
                        category={cat}
                        onClick={onCategorySelect}
                        className={layoutClass} // Передаємо клас
                    />
                );
            })}

            {/* Картка "All Categories" */}
            <div
                className={`${styles.card} ${styles.allCategoriesCard}`}
                onClick={() => onCategorySelect('all')}
            >
                <h3>All Categories</h3>
                <button className={styles.arrowBtn}>➔</button>
            </div>
        </div>
    );
};

export default CategoryList;


