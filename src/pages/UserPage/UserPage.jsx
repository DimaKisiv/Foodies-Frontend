// src/pages/UserPage/UserPage.jsx
import { Outlet, useParams, useNavigate } from "react-router-dom";
import styles from "./UserPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectFollowingFor,
} from "../../redux/users/usersSlice";
import {
  fetchUserById,
  followUser,
  unfollowUser,
} from "../../redux/users/usersOperations";
import { UserInfo } from "../../components/UserPage/UserInfo/UserInfo";
import { TabsList } from "../../components/UserPage/TabsList/TabsList";
import { useEffect, useMemo } from "react";
import { useAuthModal } from "../../providers/AuthModalProvider";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openSignIn } = useAuthModal();
  const authUser = useSelector(selectCurrentUser);
  const isOwnProfile =
    !id || id === String(authUser?.id || authUser?._id || "");

  // If visiting other user's page unauthenticated, redirect and open sign-in
  useEffect(() => {
    if (id && !authUser) {
      navigate("/", { replace: true });
      openSignIn();
    }
  }, [id, authUser, navigate, openSignIn]);

  // Load other user's info when needed
  useEffect(() => {
    if (id && !isOwnProfile) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, isOwnProfile]);

  const otherUser = useSelector((state) => (id ? state.users.byId[id] : null));
  const myKey = useMemo(
    () => "me",
    [authUser]
  );
  const followingMe = useSelector(selectFollowingFor("me"));
  const isFollowingOther = useMemo(() => {
    if (!id) return false;
    const list = followingMe?.items || [];
    return list.some((u) => String(u.id ?? u._id) === String(id));
  }, [followingMe?.items, id]);

  const onToggleFollow = useMemo(
    () => async () => {
      if (!id) return;
      try {
        if (isFollowingOther) {
          await dispatch(unfollowUser(id)).unwrap();
        } else {
          await dispatch(followUser(id)).unwrap();
        }
      } catch {
        // no-op
      }
    },
    [dispatch, id, isFollowingOther]
  );

  return (
    <div className={styles.page}>
      <aside className={styles.left}>
        {isOwnProfile ? (
          <UserInfo user={authUser} mode="own" />
        ) : (
          <UserInfo
            user={otherUser}
            mode="other"
            isFollowing={isFollowingOther}
            onToggleFollow={onToggleFollow}
          />
        )}
      </aside>

      <main className={styles.right}>
        <TabsList />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
