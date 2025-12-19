import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../../../redux/auth/authSlice.js";
import Avatar from "boring-avatars";
import RoundButton from "../../../Shared/Button/RoundButton/RoundButton.jsx";
import { useAuthModal } from "../../../../providers/useAuthModal";
import { selectFavoritesRecipes } from "../../../../redux/recipes/recipesSlice";
import {
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} from "../../../../redux/recipes/recipesOperations";
import css from "./RecipeCard.module.css";

// TODO: avatars
const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const isUserSignedIn = useSelector(selectIsAuthenticated);
  const favorites = useSelector(selectFavoritesRecipes) || [];
  const navigate = useNavigate();
  const { openSignIn } = useAuthModal();

  const isFavorite = favorites.some((r) => String(r.id) === String(recipe.id));

  const favoritesHandler = (e) => {
    e?.preventDefault?.();
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }
    if (isFavorite) {
      dispatch(deleteRecipeFromFavorites(recipe.id));
    } else {
      dispatch(addRecipeToFavorites(recipe.id));
    }
  };

  const recipeHandler = () => navigate(`/recipe/${recipe.id}`);

  return (
    <div className={css.container}>
      <div className={css.image}>
        <img src={recipe.thumb} alt={recipe.title} />
      </div>
      <div className={css.title}>
        <h4>{recipe.title}</h4>
        <p>{recipe.instructions}</p>
      </div>
      <div className={css.ui}>
        <div className={css.author}>
          <div className={css.avatar}>
            {recipe.owner.avatar ? (
              <img src={recipe.owner.avatar} alt={recipe.owner.name} />
            ) : (
              <Avatar name={recipe.owner.name} size={40} variant="pixel" />
            )}
          </div>
          <span>{recipe.owner.name}</span>
        </div>
        <div className={css.buttons}>
          <RoundButton
            iconId="icon-heart"
            onClick={favoritesHandler}
            altMode={isFavorite}
          />
          <RoundButton iconId="icon-arrow-up-right" onClick={recipeHandler} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
