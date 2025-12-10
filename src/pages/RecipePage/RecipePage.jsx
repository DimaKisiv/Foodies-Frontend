import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import {
  selectRecipesStatus,
  selectCurrentRecipe,
} from "../../redux/store/recipes/recipesSlice";
import Loader from "../../components/shared/Loader/Loader";
import { fetchRecipeById } from "../../redux/store/recipes/recipesOperations";

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectCurrentRecipe);
  const status = useSelector(selectRecipesStatus);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  return (
    <section>
      <h2>Recipe details</h2>
      {status === "loading" && <Loader />}
      {recipe != null && <RecipeInfo recipe={recipe} />}
    </section>
  );
};

export default RecipePage;
