import styles from "./PopularRecipes.module.css";
import { useSelector } from "react-redux";
import {
  selectPopularRecipes,
  selectPopularRecipesStatus,
} from "../../../redux/recipes/recipesSlice";
import Loader from "../../shared/Loader/Loader";
import RecipeCard from "../../HomePage/Recipes/RecipeCard/RecipeCard";

const PopularRecipes = () => {
  const popular = useSelector(selectPopularRecipes);
  const popularRecipesStatus = useSelector(selectPopularRecipesStatus);

  return (
    <section className={styles["popular-recipes"]}>
      <h3 className={styles["section-header"]}>Popular Recipes</h3>
      {popularRecipesStatus === "loading" && <Loader />}
      <ul className={styles["recipes-list"]}>
        {popular?.slice(0, 4)?.map((r) => (
          <li key={r.id || r._id || r.name}>
            <RecipeCard recipe={r} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularRecipes;
