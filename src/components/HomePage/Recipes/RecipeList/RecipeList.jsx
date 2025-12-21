import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuthModal from "../../../../providers/useAuthModal.js";
import {
  selectFavoritesRecipes,
  selectRecipeItems,
  selectRecipesStatus
} from "../../../../redux/recipes/recipesSlice.js";
import { selectIsAuthenticated } from "../../../../redux/auth/authSlice.js";
import {
  fetchFavoritesRecipes,
  addRecipeToFavorites,
  deleteRecipeFromFavorites
} from "../../../../redux/recipes/recipesOperations.js";
import RecipePagination from "../RecipePagination/RecipePagination.jsx";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import css from "./RecipeList.module.css";

const RecipeList = ({ sectionRef }) => {
  const [ currentId, setCurrentId ] = useState(null);
  const { openSignIn } = useAuthModal();
  const isUserSignedIn = useSelector(selectIsAuthenticated);
  const recipesStatus = useSelector(selectRecipesStatus);
  const recipes = useSelector(selectRecipeItems);
  const favorites = useSelector(selectFavoritesRecipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = (id) => {
    return currentId === id ? recipesStatus === "loading" : false;
  }

  const isFavorite = (id) => {
    return favorites.find((f) => f.id === id);
  };

  const favoriteHandler = (id) => {
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }
    setCurrentId(id);
    isFavorite(id)
      ? dispatch(deleteRecipeFromFavorites(id))
      : dispatch(addRecipeToFavorites(id));
  }

  const detailsHandler = (id) => {
    navigate(`/recipe/${id}`);
  }

  const authorHandler = (id) => {
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }
    navigate(`/user/${id}`);
  }

  useEffect(() => {
    if (isUserSignedIn) {
      dispatch(fetchFavoritesRecipes());
    }
  }, [isUserSignedIn, dispatch]);

  return (
    <div className={css.container}>
      <div className={css.list}>
        {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isLoading={isLoading(recipe.id)}
              isFavorite={isFavorite(recipe.id)}
              onFavoriteClick={favoriteHandler}
              onDetailsClick={detailsHandler}
              onAuthorClick={authorHandler}
            />
          )
        )}
      </div>
      <RecipePagination sectionRef={sectionRef} />
    </div>
  );
}

export default RecipeList;
