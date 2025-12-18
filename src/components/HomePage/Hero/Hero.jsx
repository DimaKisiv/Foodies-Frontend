import { useSelector } from "react-redux";
import css from "./Hero.module.css";
import { NavLink } from "react-router";
import { selectIsAuthenticated } from "../../../redux/auth/authSlice";
import { useAuthModal } from "../../../providers/useAuthModal";
function Hero() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { openSignIn } = useAuthModal();
  return (
    <>
      <div className={css["hero"]}>
        <h2 className={css["hero-title"]}>
          Improve Your <br /> Culinary Talents
        </h2>

        <p className={css["hero-description"]}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>

        <NavLink
          to="/recipe/add"
          onClick={(e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              openSignIn();
            }
          }}
          className={css["hero-btn"]}
        >
          Add Recipe
        </NavLink>

        <div className={css["hero-decors"]}>
          <div className={css["hero-img-1"]}></div>
          <div className={css["hero-img-2"]}></div>
        </div>
      </div>
    </>
  );
}

export default Hero;
