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
  fetchFollowing,
} from "../../redux/users/usersOperations";
import { UserInfo } from "../../components/UserPage/UserInfo/UserInfo";
import { TabsList } from "../../components/UserPage/TabsList/TabsList";
import { useEffect, useMemo, useState } from "react";
import { useAuthModal } from "../../providers/useAuthModal";
import MainTitle from "../../components/shared/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/shared/Subtitle/Subtitle.jsx";
import LogOutModal from "../../components/Modals/LogOutModal/LogOutModal.jsx";
import Breadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openSignIn } = useAuthModal();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
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

  // Ensure we have my following list to detect follow state on other profiles
  useEffect(() => {
    if (id && !isOwnProfile) {
      dispatch(fetchFollowing({}));
    }
  }, [dispatch, id, isOwnProfile]);

  const otherUser = useSelector((state) => (id ? state.users.byId[id] : null));
  // Use the 'me' key for current user's following list (auth-context based)
  const followingMe = useSelector(selectFollowingFor("me"));
  const isFollowingOther = useMemo(() => {
    if (!id) return false;
    const list = followingMe?.items || [];
    const inList = list.some((u) => String(u.id ?? u._id) === String(id));
    const serverFlag = !!otherUser?.isFollowing;
    return inList || serverFlag;
  }, [followingMe?.items, id, otherUser?.isFollowing]);

  const onToggleFollow = useMemo(
    () => async () => {
      if (!id) return;
      try {
        if (isFollowingOther) {
          await dispatch(unfollowUser(id)).unwrap();
        } else {
          await dispatch(followUser(id)).unwrap();
        }
        // Refresh following so UI button state updates immediately
        await dispatch(fetchFollowing({}));
      } catch {
        // no-op
      }
    },
    [dispatch, id, isFollowingOther]
  );

  return (
    <>
      <section className={"container"}>
        <div className={styles.page}>
          <div className={styles.header}>
            <Breadcrumbs />
            <MainTitle>PROFILE</MainTitle>
            <Subtitle maxWidth={560}>
              Reveal your culinary art, share your favorite recipe and create
              gastronomic masterpieces with us.
            </Subtitle>
          </div>
          <aside className={styles.left}>
            {isOwnProfile ? (
              <UserInfo
                user={authUser}
                mode="own"
                onLogout={() => setIsLogoutOpen(true)}
              />
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
      </section>
      <LogOutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
}
