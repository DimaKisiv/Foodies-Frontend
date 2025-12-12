import styles from './SectionSubtitle.module.css';


const SectionSubtitle = ({children}) => {
    return <p className={styles.text}>{children}</p>;
};
export default SectionSubtitle;