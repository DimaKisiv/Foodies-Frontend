// src/pages/UserPage/ListItems/UserCard/UserCard.jsx
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserCard.module.css";
import { toggleFollowUser } from "../../../../redux/users/usersOperations";
import { selectFollowRequestStatusFor } from "../../../../redux/users/usersSlice";
import profilePlaceholder from "../../../../assets/profile.png";
import foodPlaceholder from "../../../../assets/food.png";

export function UserCard({ user, isFollowing, onToggleFollow, onOpen }) {
  const name = user?.name ?? "USER NAME";
  const recipePreviews = Array.isArray(user?.recipes) ? user.recipes : [];
  const recipes = recipePreviews.length;
  const avatar = user?.avatar || user?.avatarURL;
  const dispatch = useDispatch();
  const userId = user?.id ?? user?._id;
  const followReqStatus = useSelector(selectFollowRequestStatusFor(userId));
  const isFollowRequestLoading = followReqStatus === "loading";
  // Derive following status from Redux when prop isn't explicitly provided
  const storeFollowing = useSelector((state) => {
    const items = state?.users?.followingByUserId?.["me"]?.items || [];
    return items.some((u) => String(u.id ?? u._id) === String(userId));
  });
  const effectiveIsFollowing =
    typeof isFollowing === "boolean" ? isFollowing : Boolean(storeFollowing);

  const handleToggle = async () => {
    if (onToggleFollow) return onToggleFollow();
    if (!userId) return;
    try {
      await dispatch(toggleFollowUser(userId)).unwrap();
    } catch {
      // optional: show toast
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <img
            src={avatar || profilePlaceholder}
            alt={name || "Avatar"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = profilePlaceholder;
            }}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.meta}>Own recipes: {recipes}</div>

          <button
            type="button"
            className={styles.followBtn}
            onClick={handleToggle}
            disabled={isFollowRequestLoading}
          >
            {effectiveIsFollowing ? "UNFOLLOW" : "FOLLOW"}
          </button>
        </div>
      </div>

      <div className={styles.preview}>
        {recipePreviews.slice(0, 4).map((r, idx) => (
          <div key={r.id ?? idx} className={styles.thumb}>
            <img
              src={r?.thumb || foodPlaceholder}
              alt={name ? `${name} recipe` : "Recipe"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = foodPlaceholder;
              }}
            />
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
