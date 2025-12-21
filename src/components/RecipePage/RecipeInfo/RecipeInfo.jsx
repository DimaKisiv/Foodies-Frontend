import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeInfo.module.css";
import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipeMainInfo from "./RecipeMainInfo/RecipeMainInfo";
import RecipePreparation from "./RecipePreparation/RecipePreparation";
import { selectFavoriteIds } from "../../../redux/recipes/recipesSlice";
import {
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} from "../../../redux/recipes/recipesOperations";
import foodPlaceholder from "../../../assets/food.png";

const RecipeInfo = ({ recipe }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds) || [];

  const isRecipeFavorite = favoriteIds.includes(String(recipe.id));

  const handleFavoriteClick = async () => {
    try {
      if (isRecipeFavorite) {
        await dispatch(deleteRecipeFromFavorites(recipe.id)).unwrap();
      } else {
        await dispatch(addRecipeToFavorites(recipe.id)).unwrap();
      }
    } catch {
      // помилка обробиться існуючим toast/редюсерами при потребі
    }
  };

  return (
    <div className={styles.recipe}>
      <img
        className={styles.thumb}
        src={recipe?.thumb || foodPlaceholder}
        alt={recipe?.title || "Recipe"}
        loading="lazy"
        decoding="async"
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
