import styles from './Subtitle.module.css';

const Subtitle = ({children, maxWidth}) => {
  const container = maxWidth ? {maxWidth: maxWidth} : {};

  return (
    <div style={container}>
      <p className={styles.text}>{children}</p>
    </div>
  );
};

export default Subtitle;