import styles from './CategoryCard.module.css';
import { getCategoryImage } from "../../../utils/categoryImages.js";
import CategoryName from "../CategoryName/CategoryName.jsx";
import ArrowButton from "../ArrowButton/ArrowButton.jsx";


// 1. Приймаємо className (якщо не передали, буде пустий рядок '')
const CategoryCard = ({category, onClick, className = ''}) => {

  const imageSrc = getCategoryImage(category.name);

  return (
    // 2. Додаємо його до styles.card
    <div className={`${styles.card} ${className}`}>
      <img src={imageSrc} alt={category.name} className={styles.image}/>
      <div className={styles.content}>
        <h3 className={`${styles.text} ${className}`}>{category.name}</h3>
        {/*<CategoryName>{category.name}</CategoryName>*/}
        {/*<ArrowButton*/}
        {/*    className="arrow-btn"*/}
        {/*    onClick={(e) => {*/}
        {/*        e.stopPropagation(); // Щоб не спрацював клік по картці (якщо він є)*/}
        {/*        onCategorySelect(category.name); // Викликаємо функцію батька*/}
        {/*    }}*/}
        {/*>*/}
        {/*    /!* SVG стрілка *!/*/}
        {/*    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*        <path d="M4.66699 11.3332L11.3337 4.6665" stroke="#050505" stroke-width="1.3"*/}
        {/*              stroke-linecap="round" stroke-linejoin="round"/>*/}
        {/*        <path d="M4.66699 4.6665H11.3337V11.3332" stroke="#050505" stroke-width="1.3"*/}
        {/*              stroke-linecap="round" stroke-linejoin="round"/>*/}
        {/*    </svg>*/}
        {/*</ArrowButton>*/}
      </div>
    </div>
  );
};

export default CategoryCard;