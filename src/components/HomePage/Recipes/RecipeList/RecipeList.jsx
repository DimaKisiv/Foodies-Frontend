import { useSelector } from "react-redux";
import { selectRecipeItems } from "../../../../redux/recipes/recipesSlice.js";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import RecipePagination from "../RecipePagination/RecipePagination.jsx";
import css from "./RecipeList.module.css";

const RecipeList = () => {
  const recipes = useSelector(selectRecipeItems);

  return (
    <div className={css.container}>
      <div className={css.list}>
        {recipes.map((recipe) => {
          return (
            <RecipeCard key={recipe.id} recipe={recipe}/>)
        })}
      </div>
      <RecipePagination />
    </div>
  );
}

export default RecipeList;
