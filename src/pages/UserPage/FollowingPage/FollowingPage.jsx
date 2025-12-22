import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { UserCard } from "../../../components/UserPage/ListItems/UserCard/UserCard";
import useSectionPagination from "../../../hooks/useSectionPagination";
import styles from "./FollowingPage.module.css";
import {
  fetchFollowing,
  unfollowUser,
} from "../../../redux/users/usersOperations";
import { selectFollowingFor } from "../../../redux/users/usersSlice";
import { toast } from "react-hot-toast";

export default function FollowingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, totalPages, onPageChange, setSectionTotalPages } =
    useSectionPagination();

  // Own profile only; backend uses auth when no userId is provided
  const listState = useSelector(selectFollowingFor("me"));
  const items = listState.items || [];
  const isLoading = listState.status === "loading";
  const error = listState.error || null;

  useEffect(() => {
    dispatch(fetchFollowing({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (listState.totalPages) setSectionTotalPages(listState.totalPages);
  }, [listState.totalPages, setSectionTotalPages]);

  const handleUnfollow = useCallback(
    async (u) => {
      try {
        const id = u.id ?? u._id;
        if (!id) return;
        await dispatch(unfollowUser(id)).unwrap();
        // Refresh list after unfollow
        dispatch(fetchFollowing({ page }));
      } catch (err) {
        const msg = err?.message || "Failed to unfollow user";
        toast.error(msg);
      }
    },
    [dispatch, page]
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
            isFollowing={true}
            onToggleFollow={() => handleUnfollow(u)}
            onOpen={() => navigate(`/user/${u.id ?? u._id}/recipes`)}
          />
        )}
      />
    </div>
  );
}
