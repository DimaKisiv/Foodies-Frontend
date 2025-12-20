import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeInfo.module.css";
import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipeMainInfo from "./RecipeMainInfo/RecipeMainInfo";
import RecipePreparation from "./RecipePreparation/RecipePreparation";
import { selectFavoritesRecipes } from "../../../redux/recipes/recipesSlice";
import {
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} from "../../../redux/recipes/recipesOperations";
import foodPlaceholder from "../../../assets/food.png";

const RecipeInfo = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesRecipes);

  const isRecipeFavorite = favorites.map((item) => item.id).includes(recipe.id);

  const handleFavoriteClick = () => {
    dispatch(
      isRecipeFavorite
        ? deleteRecipeFromFavorites(recipe.id)
        : addRecipeToFavorites(recipe.id)
    );
  };

  return (
    <div className={styles.recipe}>
      <img
        className={styles["thumb"]}
        src={recipe?.thumb || foodPlaceholder}
        alt={recipe?.title || "Recipe"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = foodPlaceholder;
        }}
      />
      <div>
        <RecipeMainInfo recipe={recipe} owner={recipe.owner} />
        <RecipeIngredients ingredients={recipe.ingredientsDetailed} />
        <RecipePreparation
          instructions={recipe.instructions}
          isFavorite={isRecipeFavorite}
          onFavoriteClick={handleFavoriteClick}
        />
      </div>
    </div>
  );
};

export default RecipeInfo;
