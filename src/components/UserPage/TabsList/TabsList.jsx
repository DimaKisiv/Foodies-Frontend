// src/pages/UserPage/TabsList/TabsList.jsx
import { NavLink, useParams } from "react-router-dom";
import styles from "./TabsList.module.css";

export function TabsList() {
  // userId is optional; if not passed, fall back to url param
  const params = useParams();
  const isOtherProfile = Boolean(params.id);
  const base = isOtherProfile ? `/user/${params.id}` : `/user`;
  const tabs = isOtherProfile
    ? [
        { to: `${base}/recipes`, label: "RECIPES" },
        { to: `${base}/followers`, label: "FOLLOWERS" },
      ]
    : [
        { to: `${base}/my-recipes`, label: "MY RECIPES" },
        { to: `${base}/my-favorites`, label: "MY FAVORITES" },
        { to: `${base}/followers`, label: "FOLLOWERS" },
        { to: `${base}/following`, label: "FOLLOWING" },
      ];

  return (
    <nav className={styles.tabs}>
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            isActive ? `${styles.tab} ${styles.active}` : styles.tab
          }
          end
        >
          {t.label}
        </NavLink>
      ))}
      <div className={styles.line} />
    </nav>
  );
}
