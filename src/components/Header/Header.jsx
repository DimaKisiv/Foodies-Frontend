import css from "./Header.module.css";
import { NavLink } from "react-router";
import clsx from "clsx";
import { useState } from "react";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import SignInModal from "../SignInModal/SignInModal.jsx";
import SignUpModal from "../SignUpModal/SignUpModal.jsx";

function Header() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(
      css["header-nav-link"],
      isActive && css["header-nav-link--active"]
    );
  };
  const [SignInModalOpen, SignInModalSetOpen] = useState(false);
  const [SignUpModalOpen, SignUpModalSetOpen] = useState(false);
  const [LogOutModalOpen, LogOutModalSetOpen] = useState(false);

  return (
    <>
      <div className={css["header"]}>
        <NavLink to="/" className={css.logo}>
          foodies
        </NavLink>

        <nav className={css["header-nav"]}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>

          <NavLink to="/recipe/add" className={buildLinkClass}>
            Add Recipe
          </NavLink>
        </nav>

        <div className={css["header-actions"]}>
          <button onClick={() => SignInModalSetOpen(true)}>Sign In</button>

          <button onClick={() => SignUpModalSetOpen(true)}>Sign Up</button>
        </div>
      </div>

      <SignInModal
        isOpen={SignInModalOpen}
        onClose={() => SignInModalSetOpen(false)}
      ></SignInModal>
      <SignUpModal
        isOpen={SignUpModalOpen}
        onClose={() => SignUpModalSetOpen(false)}
      ></SignUpModal>
      <LogOutModal
        isOpen={LogOutModalOpen}
        onClose={() => LogOutModalSetOpen(false)}
      ></LogOutModal>
    </>
  );
}

export default Header;
