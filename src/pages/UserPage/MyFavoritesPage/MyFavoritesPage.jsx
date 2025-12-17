// src/pages/UserPage/MyFavoritesPage/MyFavoritesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { RecipePreview } from "../../../components/UserPage/ListItems/RecipePreview/RecipePreview";
import { fetchFavoritesRecipes } from "../../../redux/recipes/recipesOperations";
import {
  selectFavoritesRecipes,
  selectRecipesLimit,
} from "../../../redux/recipes/recipesSlice";
import useSectionPagination from "../../../hooks/useSectionPagination";
import styles from "./MyFavoritesPage.module.css";

export default function MyFavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectFavoritesRecipes) || [];
  const limit = useSelector(selectRecipesLimit);
  const { page, totalPages, onPageChange, setSectionTotalPages } =
    useSectionPagination();

  useEffect(() => {
    dispatch(fetchFavoritesRecipes({ page, limit }))
      .unwrap()
      .then((payload) => {
        const total =
          payload?.total ?? payload?.count ?? payload?.totalCount ?? undefined;
        const limitFromPayload = payload?.limit ?? limit ?? 12;
        const tp =
          payload?.totalPages ??
          (total ? Math.max(1, Math.ceil(total / limitFromPayload)) : 1);
        setSectionTotalPages(tp);
      })
      .catch(() => {});
  }, [dispatch, page, limit, setSectionTotalPages]);

  return (
    <div className={styles.wrap}>
      <ListItems
        items={items}
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
              // e.g. remove from favorites
            }}
          />
        )}
      />
    </div>
  );
}
