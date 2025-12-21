import { Link } from "react-router";
import IconLink from "../../shared/IconLink/IconLink";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-header"]}>
        <Link to="/" className={styles.logo}>
          foodies
        </Link>

        <nav className={styles.socials} aria-label="Social media links">
          <IconLink
            href="https://www.facebook.com/goITclub/"
            iconId="icon-facebook"
            variant="social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          />
          <IconLink
            href="https://www.instagram.com/goitclub/"
            iconId="icon-instagram"
            variant="social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          />
          <IconLink
            href="https://www.youtube.com/c/GoIT"
            iconId="icon-youtube"
            variant="social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          />
        </nav>
      </div>

      <p className={styles.copyright}>
        &copy; {currentYear}, Foodies. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
