import { useSelector } from "react-redux";
import { selectRecipeItems } from "../../../../redux/recipes/recipesSlice.js";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import css from "./RecipeList.module.css";

const RecipeList = () => {
  const recipes = useSelector(selectRecipeItems);

  return (
    <div className={css.container}>
      {recipes.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />)
      })}
    </div>
  );
}

export default RecipeList;
