import Icon from "../Icon/Icon";
import styles from "./IconLink.module.css";

const IconLink = ({
  href,
  iconId,
  variant = "default", // "default" | "social" | "white"
  className = "",
  ...props
}) => {
  const linkClassName = [styles.iconLink, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={linkClassName} {...props}>
      <Icon
        id={iconId}
        width={20}
        height={20}
        className={styles.iconLinkIcon}
        aria-hidden="true"
      />
    </a>
  );
};

export default IconLink;
