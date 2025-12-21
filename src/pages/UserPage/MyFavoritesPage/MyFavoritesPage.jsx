import { useEffect, useCallback } from "react";
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
  selectFavoritesTotalPages,
  selectRecipesStatus,
  selectRecipesError,
} from "../../../redux/recipes/recipesSlice";
import useSectionPagination from "../../../hooks/useSectionPagination";
import styles from "./MyFavoritesPage.module.css";

const FAVORITES_PER_PAGE = 9;

export default function MyFavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoritesPageItems = useSelector(selectFavoritesRecipes) || [];
  const favoritesTotalPages = useSelector(selectFavoritesTotalPages) || 1;
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  const { page, totalPages, onPageChange, setSectionTotalPages, setPage } =
    useSectionPagination();

  const loadFavoritesPage = useCallback(
    async (p) => {
      const res = await dispatch(
        fetchFavoritesRecipes({ page: p, limit: FAVORITES_PER_PAGE })
      ).unwrap();
      const tp =
        Number(res?.totalPages || res?.total_pages) ||
        (res?.total && res?.limit
          ? Math.max(1, Math.ceil(Number(res.total) / Number(res.limit)))
          : 1);

      setSectionTotalPages(tp || 1);
      if (p > (tp || 1)) {
        setPage(tp || 1);
      }

      return res;
    },
    [dispatch, setPage, setSectionTotalPages]
  );

  useEffect(() => {
    loadFavoritesPage(page).catch(() => {});
  }, [loadFavoritesPage, page]);
  useEffect(() => {
    setSectionTotalPages(Number(favoritesTotalPages || 1));
    if (page > Number(favoritesTotalPages || 1)) {
      setPage(Number(favoritesTotalPages || 1));
    }
  }, [favoritesTotalPages, page, setPage, setSectionTotalPages]);

  const handleDelete = async (recipe) => {
    const id = recipe?.id || recipe?._id;
    if (!id) return;

    try {
      await dispatch(deleteRecipeFromFavorites(id)).unwrap();
      const res = await loadFavoritesPage(page);
      if ((res?.items || []).length === 0 && page > 1) {
        setPage(page - 1);
      }
    } catch {
      // помилки — через існуючу обробку
    }
  };

  return (
    <div className={styles.wrap}>
      <ListItems
        items={favoritesPageItems}
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
            onDelete={() => handleDelete(recipe)}
          />
        )}
      />
    </div>
  );
}
