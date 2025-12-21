import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuthModal from "../../../../providers/useAuthModal.js";
import {
  selectFavoriteIds,
  selectRecipeItems,
  selectRecipesStatus,
} from "../../../../redux/recipes/recipesSlice.js";
import { selectIsAuthenticated } from "../../../../redux/auth/authSlice.js";
import {
  fetchFavoriteIds,
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} from "../../../../redux/recipes/recipesOperations.js";
import RecipePagination from "../RecipePagination/RecipePagination.jsx";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import css from "./RecipeList.module.css";

const RecipeList = ({ sectionRef }) => {
  const [currentId, setCurrentId] = useState(null);

  const { openSignIn } = useAuthModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserSignedIn = useSelector(selectIsAuthenticated);
  const recipesStatus = useSelector(selectRecipesStatus);
  const recipes = useSelector(selectRecipeItems) || [];
  const favoriteIds = useSelector(selectFavoriteIds) || [];

  const isLoading = (id) =>
    String(currentId) === String(id) && recipesStatus === "loading";

  const isFavorite = (id) => favoriteIds.includes(String(id));

  const favoriteHandler = async (id) => {
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }

    setCurrentId(id);
    try {
      if (isFavorite(id)) {
        await dispatch(deleteRecipeFromFavorites(id)).unwrap();
      } else {
        await dispatch(addRecipeToFavorites(id)).unwrap();
      }
    } finally {
      setCurrentId(null);
    }
  };

  const detailsHandler = (id) => navigate(`/recipe/${id}`);

  const authorHandler = (id) => {
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    if (isUserSignedIn) {
      dispatch(fetchFavoriteIds()).catch(() => {});
    }
  }, [dispatch, isUserSignedIn]);

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
        ))}
      </div>

      <RecipePagination sectionRef={sectionRef} />
    </div>
  );
};

export default RecipeList;
