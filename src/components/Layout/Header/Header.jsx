import css from "./Header.module.css";
import { NavLink } from "react-router";
import clsx from "clsx";
import React, { useState } from "react";
import LogOutModal from "../../Modals/LogOutModal/LogOutModal.jsx";
import SignInModal from "../../Modals/SignInModal/SignInModal.jsx";
import SignUpModal from "../../Modals/SignUpModal/SignUpModal.jsx";
import Icon from "../../shared/Icon/Icon";
import { useSelector } from "react-redux";
import {
  selectAuthUser,
  selectIsAuthenticated,
} from "../../../redux/auth/authSlice";
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
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

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

        {isAuthenticated && user ? (
          <div
            className={css["header-profile"]}
            onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
          >
            <div className={css["header-profile-action"]}>
              <div className={css["header-profile-img"]}></div>

              <p className={css["header-profile-name"]}>{user.name}</p>

              <button className={css["header-profile-arrow"]}>
                <Icon
                  id="icon-chevron-down"
                  className={`${openProfileDropdown ? css["arrow__up"] : ""}`}
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
              </button>
            </div>

            {openProfileDropdown && (
              <div className={css["header-profile-content"]}>
                <NavLink
                  to="/user"
                  className={css["header-profile-content__item"]}
                >
                  Profile
                </NavLink>
                <button
                  className={css["header-profile-content__item"]}
                  onClick={() => LogOutModalSetOpen(true)}
                >
                  <span>Log Out</span>
                  <Icon
                    id="icon-arrow-up-right"
                    width={18}
                    height={18}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={css["header-actions"]}>
            <button onClick={() => SignInModalSetOpen(true)}>Sign In</button>

            <button onClick={() => SignUpModalSetOpen(true)}>Sign Up</button>
          </div>
        )}
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
