import { Outlet } from "react-router";

export default function UserPage() {
  return (
    <div>
      <h1>User Page</h1>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
