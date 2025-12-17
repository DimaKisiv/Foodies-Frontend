// src/pages/UserPage/FollowersPage/FollowersPage.jsx
import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { UserCard } from "../../../components/UserPage/ListItems/UserCard/UserCard";
import useSectionPagination from "../../../hooks/useSectionPagination";
import styles from "./FollowersPage.module.css";
import {
  fetchFollowers,
  followUser,
  unfollowUser,
} from "../../../redux/users/usersOperations";
import {
  selectFollowersFor,
  selectCurrentUser,
} from "../../../redux/users/usersSlice";

export default function FollowersPage() {
  const params = useParams();
  const authUser = useSelector(selectCurrentUser);
  const targetUserId = useMemo(
    () => String(params.id || authUser?.id || authUser?._id || ""),
    [params.id, authUser]
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, totalPages, onPageChange, setSectionTotalPages } =
    useSectionPagination();

  const listState = useSelector(selectFollowersFor(targetUserId));
  const items = listState.items || [];
  const isLoading = listState.status === "loading";
  const error = listState.error || null;

  useEffect(() => {
    if (!targetUserId) return;
    dispatch(fetchFollowers({ userId: targetUserId, page }));
  }, [dispatch, targetUserId, page]);

  useEffect(() => {
    if (listState.totalPages) setSectionTotalPages(listState.totalPages);
  }, [listState.totalPages, setSectionTotalPages]);

  const handleToggleFollow = useCallback(
    async (u) => {
      try {
        const id = u.id ?? u._id;
        if (!id) return;
        if (u.isFollowing) {
          await dispatch(unfollowUser(id)).unwrap();
        } else {
          await dispatch(followUser(id)).unwrap();
        }
        // Refresh current list
        dispatch(fetchFollowers({ userId: targetUserId, page }));
      } catch {
        // noop; could show toast
      }
    },
    [dispatch, targetUserId, page]
  );

  return (
    <div className={styles.wrap}>
      <ListItems
        items={items}
        isLoading={isLoading}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        renderItem={(u) => (
          <UserCard
            user={u}
            isFollowing={Boolean(u?.isFollowing)}
            onToggleFollow={() => handleToggleFollow(u)}
            onOpen={() => navigate(`/user/${u.id ?? u._id}/recipes`)}
          />
        )}
      />
    </div>
  );
}
