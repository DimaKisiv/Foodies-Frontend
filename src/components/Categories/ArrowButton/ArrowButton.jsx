import styles from './ArrowButton.module.css';

const ArrowButton = ({onClick, children, className = ''}) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ArrowButton;