// src/pages/UserPage/ListItems/UserCard/UserCard.jsx
import styles from "./UserCard.module.css";

export function UserCard({
  user,
  isFollowing = false,
  onToggleFollow,
  onOpen,
}) {
  const name = user?.name ?? "USER NAME";
  const recipePreviews = Array.isArray(user?.recipes) ? user.recipes : [];
  const recipes = recipePreviews.length;

  return (
    <article className={styles.card}>
      <div className={styles.left}>
        <div className={styles.avatar} />

        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.meta}>Own recipes: {recipes}</div>

          <button
            type="button"
            className={styles.followBtn}
            onClick={onToggleFollow}
          >
            {isFollowing ? "UNFOLLOW" : "FOLLOW"}
          </button>
        </div>
      </div>

      <div className={styles.preview}>
        {recipePreviews.slice(0, 4).map((r, idx) => (
          <div key={r.id ?? idx} className={styles.thumb}>
            {r?.thumb ? (
              <img src={r.thumb} alt={name ? `${name} recipe` : "Recipe"} />
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.openBtn}
        onClick={onOpen}
        title="Open"
      >
        ↗
      </button>
    </article>
  );
}
