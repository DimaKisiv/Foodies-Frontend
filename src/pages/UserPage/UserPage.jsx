// src/pages/UserPage/UserPage.jsx
import { Outlet, useParams } from "react-router-dom";
import styles from "./UserPage.module.css";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/users/usersSlice";
import { UserInfo } from "../../components/UserPage/UserInfo/UserInfo";
import { TabsList } from "../../components/UserPage/TabsList/TabsList";

export default function UserPage() {
  const { id } = useParams();
  const authUser = useSelector(selectCurrentUser);
  const isOwnProfile =
    !id || id === String(authUser?.id || authUser?._id || "");

  return (
    <div className={styles.page}>
      <aside className={styles.left}>
        <UserInfo user={isOwnProfile ? authUser : null} />
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
