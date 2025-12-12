import RecipeFilters from "./RecipeFilters/RecipeFilters";
import RecipeList from "./RecipeList/RecipeList";
import RecipePagination from "./RecipePagination/RecipePagination";

export default function Recipes() {
  return (
    <div>
      Recipes
      <RecipesFilters></RecipesFilters>
      <RecipeList></RecipeList>
      <RecipePagination></RecipePagination>
    </div>
  );
}
