import styles from './Subtitle.module.css';


const Subtitle = ({ children }) => {
    return <p className={styles.text}>{ children }</p>;
};
export default Subtitle;