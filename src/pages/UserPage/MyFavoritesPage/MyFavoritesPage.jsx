// src/pages/UserPage/MyFavoritesPage/MyFavoritesPage.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { RecipePreview } from "../../../components/UserPage/ListItems/RecipePreview/RecipePreview";
import {
  fetchFavoritesRecipes,
  deleteRecipeFromFavorites,
} from "../../../redux/recipes/recipesOperations";
import {
  selectFavoritesRecipes,
  selectRecipesLimit,
  selectRecipesStatus,
  selectRecipesError,
} from "../../../redux/recipes/recipesSlice";
import useSectionPagination from "../../../hooks/useSectionPagination";
import styles from "./MyFavoritesPage.module.css";

const FAVORITES_PER_PAGE = 9;

export default function MyFavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(selectFavoritesRecipes) || [];
  const recipesLimit = useSelector(selectRecipesLimit);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);
  const perPage =
    recipesLimit === FAVORITES_PER_PAGE ? recipesLimit : FAVORITES_PER_PAGE;
  const { page, totalPages, onPageChange, setSectionTotalPages, setPage } =
    useSectionPagination();

  useEffect(() => {
    dispatch(fetchFavoritesRecipes()).catch(() => {});
  }, [dispatch]);

  const computedTotalPages = useMemo(() => {
    const total = favorites.length;
    return Math.max(1, Math.ceil(total / perPage));
  }, [favorites.length, perPage]);

  useEffect(() => {
    setSectionTotalPages(computedTotalPages);
    if (page > computedTotalPages) setPage(computedTotalPages);
  }, [computedTotalPages, page, setPage, setSectionTotalPages]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return favorites.slice(start, start + perPage);
  }, [favorites, page, perPage]);

  return (
    <div className={styles.wrap}>
      <ListItems
        items={pagedItems}
        isLoading={status === "loading"}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        renderItem={(recipe) => (
          <RecipePreview
            recipe={recipe}
            onOpen={() => {
              const id = recipe?.id || recipe?._id;
              if (id) navigate(`/recipe/${id}`);
            }}
            onDelete={() => {
              const id = recipe?.id || recipe?._id;
              if (!id) return;
              dispatch(deleteRecipeFromFavorites(id)).catch(() => {});
            }}
          />
        )}
      />
    </div>
  );
}
