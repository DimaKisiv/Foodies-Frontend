import styles from './CategoryCard.module.css';
import {getCategoryImage} from "../../../utils/categoryImages.js";


// 1. Приймаємо className (якщо не передали, буде пустий рядок '')
const CategoryCard = ({category, onClick, className = ''}) => {

    const imageSrc = getCategoryImage(category.name);

    return (
        // 2. Додаємо його до styles.card
        <div className={`${styles.card} ${className}`}>
            <img src={imageSrc} alt={category.name} className={styles.image}/>
            <div className={styles.content}>
                <h3>{category.name}</h3>
                <button
                    className={styles.arrowBtn}
                    onClick={() => onClick(category.name)}
                >
                    ➔
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;