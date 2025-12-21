import css from "./Header.module.css";
import { NavLink } from "react-router";
import clsx from "clsx";
import React, { useState } from "react";
import LogOutModal from "../../Modals/LogOutModal/LogOutModal.jsx";
import { useAuthModal } from "../../../providers/useAuthModal";
import { useSelector } from "react-redux";
import {
  selectAuthUser,
  selectIsAuthenticated,
} from "../../../redux/auth/authSlice";
import { selectCurrentUser } from "../../../redux/users/usersSlice";
import Icon from "../../shared/Icon/Icon.jsx";
import profilePlaceholder from "../../../assets/profile.png";
import { useLocation } from "react-router-dom";
function Header() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(
      css["header-nav-link"],
      isActive && css["header-nav-link--active"]
    );
  };
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { authModal, openSignIn, openSignUp } = useAuthModal();
  const [LogOutModalOpen, LogOutModalSetOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authUser = useSelector(selectAuthUser);
  const currentUser = useSelector(selectCurrentUser);
  const user = currentUser || authUser;

  return (
    <>
      <header
        className={clsx(css["header"], !isHomePage && css["header--white"])}
      >
        <NavLink to="/" className={css.logo}>
          foodies
        </NavLink>

        <nav className={css["header-nav"]}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>

          <NavLink
            to="/recipe/add"
            className={buildLinkClass}
            onClick={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                openSignIn();
              }
            }}
          >
            Add Recipe
          </NavLink>
        </nav>

        {isAuthenticated && user ? (
          <div
            className={css["header-profile"]}
            onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
          >
            <div className={css["header-profile-action"]}>
              <div className={css["header-profile-img"]}>
                <img
                  src={user?.avatar || user?.avatarURL || profilePlaceholder}
                  alt={user?.name || "Avatar"}
                  aria-hidden={!user?.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = profilePlaceholder;
                  }}
                />
              </div>

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
          <div
            className={clsx(
              css["header-actions"],
              authModal === "signin" && css["header-actions--signin"],
              authModal === "signup" && css["header-actions--signup"]
            )}
          >
            <button onClick={() => openSignIn()}>Sign In</button>

            <button onClick={() => openSignUp()}>Sign Up</button>
          </div>
        )}
      </header>

      <LogOutModal
        isOpen={LogOutModalOpen}
        onClose={() => LogOutModalSetOpen(false)}
      ></LogOutModal>
    </>
  );
}

export default Header;
