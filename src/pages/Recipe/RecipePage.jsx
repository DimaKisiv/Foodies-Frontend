import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/store/recipes/recipesOperations";
import {
  selectRecipeItems,
  selectRecipesStatus,
} from "../../redux/store/recipes/recipesSlice";
import Loader from "../../components/shared/Loader/Loader";

const RecipePage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipeItems);
  const status = useSelector(selectRecipesStatus);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <section>
      <h2>Recipes</h2>
      {status === "loading" && <Loader />}
      <ul>
        {recipes?.map((r) => (
          <li key={r.id || r._id || r.name}>{r.name || r.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default RecipePage;
