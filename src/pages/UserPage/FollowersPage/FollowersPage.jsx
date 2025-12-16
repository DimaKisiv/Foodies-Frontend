// src/pages/UserPage/FollowersPage/FollowersPage.jsx
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { UserCard } from "../../../components/UserPage/ListItems/UserCard/UserCard";
import styles from "./FollowersPage.module.css";

export default function FollowersPage() {
  // TODO: Redux
  const items = [];
  const page = 1;
  const totalPages = 2;

  return (
    <div className={styles.wrap}>
      <ListItems
        items={items}
        page={page}
        totalPages={totalPages}
        onPageChange={() => {}}
        renderItem={(u) => (
          <UserCard
            user={u}
            isFollowing={false /* TODO */}
            onToggleFollow={() => {
              // TODO follow/unfollow
            }}
            onOpen={() => {
              // TODO navigate to user page
            }}
          />
        )}
      />
    </div>
  );
}
