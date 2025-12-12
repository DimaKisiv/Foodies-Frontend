import styles from './CategoryName.module.css';

const CategoryName = ({children, className = ''}) => {
    return (
        <h3 className={`${styles.text} ${className}`}>
            {children}
        </h3>
    );
};

export default CategoryName;