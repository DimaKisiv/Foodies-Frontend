import styles from "./PopularRecipes.module.css";
import { useSelector } from "react-redux";
import {
  selectPopularRecipes,
  selectRecipesStatus,
} from "../../../redux/recipes/recipesSlice";
import Loader from "../../Shared/Loader/Loader";
import RecipeCard from "../../HomePage/Recipes/RecipeCard/RecipeCard";

const PopularRecipes = () => {
  const popular = useSelector(selectPopularRecipes);
  const recipesStatus = useSelector(selectRecipesStatus);

  return (
    <section className={styles["popular-recipes"]}>
      <h3 className={styles["section-header"]}>Popular Recipes</h3>
      {recipesStatus === "loading" && <Loader />}
      <ul className={styles["recipes-list"]}>
        {popular?.map((r) => (
          <li key={r.id || r._id || r.name}>
            <RecipeCard recipe={r} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularRecipes;
