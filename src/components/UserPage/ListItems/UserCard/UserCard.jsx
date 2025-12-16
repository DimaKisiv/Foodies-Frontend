// src/pages/UserPage/ListItems/UserCard/UserCard.jsx
import styles from "./UserCard.module.css";

export function UserCard({
  user,
  isFollowing = false,
  onToggleFollow,
  onOpen,
}) {
  const name = user?.name ?? "USER NAME";
  const recipes = user?.recipesCount ?? 0;

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
        {/* Template thumbnails (copilot can map real thumbnails) */}
        <div className={styles.thumb} />
        <div className={styles.thumb} />
        <div className={styles.thumb} />
        <div className={styles.thumb} />
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
