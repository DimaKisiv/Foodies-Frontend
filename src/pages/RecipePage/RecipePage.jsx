import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipesStatus,
  selectCurrentRecipe,
} from "../../redux/recipes/recipesSlice";
import { selectIsAuthenticated } from "../../redux/auth/authSlice";
import Loader from "../../components/shared/Loader/Loader";
import {
  fetchFavoriteIds,
  fetchPopularRecipes,
  fetchRecipeById,
} from "../../redux/recipes/recipesOperations";
import styles from "./RecipePage.module.css";
import "../../index.css";
import RecipeInfo from "../../components/RecipePage/RecipeInfo/RecipeInfo";
import { useParams } from "react-router";
import PopularRecipes from "../../components/RecipePage/PopularRecipes/PopularRecipes";

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector(selectCurrentRecipe);
  const status = useSelector(selectRecipesStatus);
  const isAuth = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    dispatch(fetchPopularRecipes());
    if (isAuth) {
      dispatch(fetchFavoriteIds()).catch(() => {});
    }
  }, [dispatch, id, isAuth]);

  return (
    <section className={styles["recipe-page"] + " " + "container"}>
      {status === "loading" && <Loader />}
      {recipe != null && <RecipeInfo recipe={recipe} />}
      <PopularRecipes />
    </section>
  );
};

export default RecipePage;
