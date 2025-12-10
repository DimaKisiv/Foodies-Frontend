import React from "react";
import { Link } from "react-router";
import styles from "./Navigation.module.css";

// Keep in sync with routes in src/App.jsx
const routes = [
  { to: "/", label: "Home" },
  { to: "/category", label: "Category" },
  { to: "/recipe", label: "Recipe" },
  { to: "/add-recipe", label: "Add Recipe" },
  { to: "/user", label: "User" },
  { to: "/user/my-recipes", label: "My Recipes" },
  { to: "/user/my-favorites", label: "My Favorites" },
];

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
