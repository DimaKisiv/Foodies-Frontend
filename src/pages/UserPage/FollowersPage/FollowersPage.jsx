import { useEffect, useCallback } from "react";
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
import { toast } from "react-hot-toast";

export default function FollowersPage() {
  const params = useParams();
  const isOtherProfile = Boolean(params.id);
  const otherUserId = params.id ? String(params.id) : "";
  // Use 'me' key when on own profile (no id in URL)
  const listKey = isOtherProfile ? otherUserId : "me";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, totalPages, onPageChange, setSectionTotalPages } =
    useSectionPagination();

  const listState = useSelector(selectFollowersFor(listKey));
  const me = useSelector(selectCurrentUser);
  const items = listState.items || [];
  const isLoading = listState.status === "loading";
  const error = listState.error || null;

  useEffect(() => {
    // If viewing another user's profile, pass their id.
    // If on own profile (no id in URL), omit userId so backend uses auth context.
    if (isOtherProfile) {
      if (!otherUserId) return;
      dispatch(fetchFollowers({ userId: otherUserId, page }));
    } else {
      dispatch(fetchFollowers({ page }));
    }
  }, [dispatch, isOtherProfile, otherUserId, page]);

  useEffect(() => {
    if (listState.totalPages) setSectionTotalPages(listState.totalPages);
  }, [listState.totalPages, setSectionTotalPages]);

  const handleToggleFollow = useCallback(
    async (u) => {
      try {
        const id = String(u.id ?? u._id ?? "");
        if (!id) return;

        // Prevent following myself; still handle backend error below just in case
        const myId = String(me?.id ?? me?._id ?? "");
        if (myId && id === myId && !u.isFollowing) {
          toast.error("You cannot follow yourself");
          return;
        }

        if (u.isFollowing) {
          await dispatch(unfollowUser(id)).unwrap();
        } else {
          await dispatch(followUser(id)).unwrap();
        }
        // Refresh current list with the same keying logic
        if (isOtherProfile) {
          dispatch(fetchFollowers({ userId: otherUserId, page }));
        } else {
          dispatch(fetchFollowers({ page }));
        }
      } catch (err) {
        const msg = err?.message || "Failed to update follow state";
        // Normalize common backend message
        const friendly = /yourself/i.test(msg)
          ? "You cannot follow yourself"
          : msg;
        toast.error(friendly);
      }
    },
    [dispatch, isOtherProfile, otherUserId, page, me]
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
            onToggleFollow={() => handleToggleFollow(u)}
            onOpen={() => navigate(`/user/${u.id ?? u._id}/recipes`)}
          />
        )}
      />
    </div>
  );
}
