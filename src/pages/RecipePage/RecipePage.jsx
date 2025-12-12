import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipesStatus,
  selectCurrentRecipe,
} from "../../redux/recipes/recipesSlice";
import Loader from "../../components/Shared/Loader/Loader";
import { fetchRecipeById } from "../../redux/recipes/recipesOperations";
import styles from "./RecipePage.module.css";
import RecipeInfo from "../../components/RecipePage/RecipeInfo/RecipeInfo";
import { useParams } from "react-router";

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectCurrentRecipe);
  const status = useSelector(selectRecipesStatus);
  console.log("REcipeID: " + id);
  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  return (
    <section className={styles["recipe-page"]}>
      {status === "loading" && <Loader />}
      {recipe != null && <RecipeInfo recipe={recipe} />}
    </section>
  );
};

export default RecipePage;
