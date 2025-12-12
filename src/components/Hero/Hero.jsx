import css from "./Hero.module.css"
import { NavLink } from "react-router";

function Hero () {

    return (
        <>
            <div className={css['hero']}>
                <h2 className={css['hero-title']}>Improve Your <br/> Culinary Talents</h2>

                <p className={css['hero-description']}>
                    Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.
                </p>

                <NavLink to="/add-recipe" className={css['hero-btn']}>
                    Add Recipe
                </NavLink>
            </div>
        </>
    )
}

export default Hero
