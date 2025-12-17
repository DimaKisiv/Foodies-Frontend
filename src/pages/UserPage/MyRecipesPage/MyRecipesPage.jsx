// src/pages/UserPage/MyRecipesPage/MyRecipesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { RecipePreview } from "../../../components/UserPage/ListItems/RecipePreview/RecipePreview";
import {
  fetchRecipes,
  fetchOwnRecipes,
} from "../../../redux/recipes/recipesOperations";
import {
  selectRecipeItems,
  selectRecipesLimit,
} from "../../../redux/recipes/recipesSlice";
import useSectionPagination from "../../../hooks/useSectionPagination";
import styles from "./MyRecipesPage.module.css";

export default function MyRecipesPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const items = useSelector(selectRecipeItems) || [];
  const limit = useSelector(selectRecipesLimit);
  const { page, totalPages, onPageChange, setSectionTotalPages } =
    useSectionPagination();

  useEffect(() => {
    const thunk = params.id
      ? fetchRecipes({ author: params.id, page, limit })
      : fetchOwnRecipes({ page, limit });
    dispatch(thunk)
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
      .catch(() => {
        // ignore, ListItems will show error from recipes slice if needed
      });
  }, [dispatch, params.id, page, limit, setSectionTotalPages]);

  return (
    <div className={styles.wrap}>
      <ListItems
        title={null}
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
              // TODO dispatch delete
            }}
          />
        )}
      />
    </div>
  );
}
