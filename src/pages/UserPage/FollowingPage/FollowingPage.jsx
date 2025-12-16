// src/pages/UserPage/FollowingPage/FollowingPage.jsx
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { UserCard } from "../../../components/UserPage/ListItems/UserCard/UserCard";
import styles from "./FollowingPage.module.css";

export default function FollowingPage() {
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
            isFollowing={true /* TODO */}
            onToggleFollow={() => {}}
            onOpen={() => {}}
          />
        )}
      />
    </div>
  );
}
