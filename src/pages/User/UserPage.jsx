import { Outlet } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/store/users/usersOperations";
import {
  selectUsersItems,
  selectUsersStatus,
  selectUsersError,
} from "../../redux/store/users/usersSlice";
import Loader from "../../components/shared/Loader/Loader";

export default function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsersItems);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>User Page</h1>
      <section>
        <h2>All Users</h2>
        {status === "loading" && <Loader />}
        {error && <p>Error: {String(error)}</p>}
        <ul>
          {users?.map((u) => (
            <li key={u.id || u._id || u.email || u.name}>
              {u.name || u.username || u.email || JSON.stringify(u)}
            </li>
          ))}
        </ul>
      </section>
      <Outlet />
    </div>
  );
}
