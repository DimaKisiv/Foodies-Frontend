import { Link } from "react-router-dom";
import Container from "../Shared/Container/Container";
import IconLink from "../Shared/IconLink/IconLink";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.topRow}>
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

        <div className={styles.divider} />

        <p className={styles.copyright}>
          &copy; {currentYear}, Foodies. All rights reserved
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
