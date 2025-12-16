// src/pages/UserPage/UserInfo/UserInfo.jsx
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/users/usersSlice";
import styles from "./UserInfo.module.css";

export function UserInfo({ user }) {
  // Prefer explicit prop; otherwise fall back to current user from Redux
  const current = useSelector(selectCurrentUser);
  const me = user ?? current;

  const name = me?.name ?? "";
  const email = me?.email ?? "";

  const stats = [
    { label: "Added recipes:", value: me?.recipesCount ?? 0 },
    { label: "Favorites:", value: me?.favoritesCount ?? 0 },
    { label: "Followers:", value: me?.followersCount ?? 0 },
    { label: "Following:", value: me?.followingCount ?? 0 },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <div className={styles.avatar} aria-label="User avatar" />
        <button
          className={styles.addAvatarBtn}
          type="button"
          title="Change avatar"
        >
          +
        </button>
      </div>

      <div className={styles.name}>{name}</div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Email:</span>
          <span className={styles.metaValue}>{email}</span>
        </div>

        {stats.map((s) => (
          <div key={s.label} className={styles.metaRow}>
            <span className={styles.metaLabel}>{s.label}</span>
            <span className={styles.metaValue}>{s.value}</span>
          </div>
        ))}
      </div>

      <button className={styles.logoutBtn} type="button">
        LOG OUT
      </button>
    </div>
  );
}
