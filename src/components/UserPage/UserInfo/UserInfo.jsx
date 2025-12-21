// src/pages/UserPage/UserInfo/UserInfo.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { selectCurrentUser } from "../../../redux/users/usersSlice";
import { selectUsersStatus } from "../../../redux/users/usersSlice";
import { selectFollowRequestStatusFor } from "../../../redux/users/usersSlice";
import { updateAvatar } from "../../../redux/users/usersOperations";
import styles from "./UserInfo.module.css";
import profilePlaceholder from "../../../assets/profile.png";

export function UserInfo({
  user,
  mode = "own",
  isFollowing = false,
  onToggleFollow,
  onLogout,
}) {
  // Prefer explicit prop; otherwise fall back to current user from Redux
  const current = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const me = user ?? current;
  const usersStatus = useSelector(selectUsersStatus);
  const followReqStatus = useSelector(
    selectFollowRequestStatusFor(user?.id ?? user?._id)
  );
  const isFollowRequestLoading = followReqStatus === "loading";

  const name = me?.name ?? "";
  const email = me?.email ?? "";

  const stats = useMemo(() => {
    const added =
      me?.recipesCount ??
      (Array.isArray(me?.recipes) ? me.recipes.length : 0) ??
      0;
    if (mode === "other") {
      return [
        { label: "Added recipes:", value: added },
        { label: "Followers:", value: me?.followersCount ?? 0 },
      ];
    }
    return [
      { label: "Added recipes:", value: added },
      { label: "Favorites:", value: me?.favoritesCount ?? 0 },
      { label: "Followers:", value: me?.followersCount ?? 0 },
      { label: "Following:", value: me?.followingCount ?? 0 },
    ];
  }, [
    me?.recipesCount,
    me?.recipes,
    me?.followersCount,
    me?.favoritesCount,
    me?.followingCount,
    mode,
  ]);

  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onPickAvatar = () => {
    if (mode === "other") return; // Do not allow changing other user's avatar
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return localUrl;
      });
      try {
        await dispatch(updateAvatar(file)).unwrap();
        // Avatar in auth slice will update, and UserInfo uses that value
      } catch {
        // silently ignore; UI could show a toast in future
      }
    };
    input.click();
  };

  const avatarUrl = previewUrl || me?.avatar || me?.avatarURL || "";

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <div className={styles.avatar} aria-label="User avatar">
          <img
            src={avatarUrl || profilePlaceholder}
            alt={name || "Avatar"}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = profilePlaceholder;
            }}
          />
        </div>
        {mode === "own" ? (
          <button
            className={styles.addAvatarBtn}
            type="button"
            title="Change avatar"
            onClick={onPickAvatar}
            disabled={usersStatus === "loading"}
          >
            +
          </button>
        ) : null}
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

      {mode === "own" ? (
        <button className={styles.logoutBtn} type="button" onClick={onLogout}>
          LOG OUT
        </button>
      ) : (
        <button
          className={styles.logoutBtn}
          type="button"
          onClick={onToggleFollow}
          disabled={usersStatus === "loading" || isFollowRequestLoading}
        >
          {isFollowing ? "UNFOLLOW" : "FOLLOW"}
        </button>
      )}
    </div>
  );
}
