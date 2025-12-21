import styles from "./PopularRecipes.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthModal from "../../../providers/useAuthModal.js";
import {
  selectPopularRecipes,
  selectPopularRecipesStatus,
} from "../../../redux/recipes/recipesSlice";
import { selectIsAuthenticated } from "../../../redux/auth/authSlice";
import {
  fetchFavoriteIds,
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} from "../../../redux/recipes/recipesOperations";
import Loader from "../../shared/Loader/Loader";
import RecipeCard from "../../HomePage/Recipes/RecipeCard/RecipeCard";

const PopularRecipes = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openSignIn } = useAuthModal();

  const popular = useSelector(selectPopularRecipes) || [];
  const popularRecipesStatus = useSelector(selectPopularRecipesStatus);
  const isUserSignedIn = useSelector(selectIsAuthenticated);
  const favoriteIds = useSelector((state) => state.recipes.favoriteIds) || [];

  const isLoading = (id) =>
    String(currentId) === String(id) && popularRecipesStatus === "loading";
  const isFavorite = (id) => favoriteIds.includes(String(id));

  const favoriteHandler = (id) => {
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }
    setCurrentId(id);
    isFavorite(id)
      ? dispatch(deleteRecipeFromFavorites(id))
      : dispatch(addRecipeToFavorites(id));
  };

  const detailsHandler = (id) => {
    navigate(`/recipe/${id}`);
  };

  const authorHandler = (id) => {
    if (!isUserSignedIn) {
      openSignIn();
      return;
    }
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    if (isUserSignedIn) {
      dispatch(fetchFavoriteIds());
    }
  }, [dispatch, isUserSignedIn]);

  return (
    <section className={styles["popular-recipes"]}>
      <h3 className={styles["section-header"]}>Popular Recipes</h3>
      {popularRecipesStatus === "loading" && <Loader />}
      <ul className={styles["recipes-list"]}>
        {popular?.slice(0, 4)?.map((recipe) => (
          <li key={recipe.id || recipe._id || recipe.name}>
            <RecipeCard
              recipe={recipe}
              isLoading={isLoading(recipe.id)}
              isFavorite={isFavorite(recipe.id)}
              onFavoriteClick={favoriteHandler}
              onDetailsClick={detailsHandler}
              onAuthorClick={authorHandler}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularRecipes;
