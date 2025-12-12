import styles from "./Container.module.css";

const Container = ({ children, className = "", ...props }) => {
  const containerClassName = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} {...props}>
      {children}
    </div>
  );
};

export default Container;
