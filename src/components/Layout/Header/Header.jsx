import { Link } from "react-router";
import styles from "./Header.module.css";

const routes = [
  { to: "/", label: "Home" },
  {
    to: "/recipe/WqTbctwYxTVNYiRc5hvTD",
    label: "Recipe (Salmon Avocado Salad)",
  },
  { to: "/recipe/add", label: "Add Recipe" },
  { to: "/user/xe5qH2mG0yokWj_51txi8", label: "User" },
  { to: "/user/xe5qH2mG0yokWj_51txi8/my-recipes", label: "My Recipes" },
  { to: "/user/xe5qH2mG0yokWj_51txi8/my-favorites", label: "My Favorites" },
  { to: "/user/xe5qH2mG0yokWj_51txi8/followers", label: "Followers" },
  { to: "/user/xe5qH2mG0yokWj_51txi8/following", label: "Following" },
];

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {routes.map((r) => (
            <li key={r.to}>
              <Link to={r.to} className={styles.link}>
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
