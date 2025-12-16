// src/pages/UserPage/MyFavoritesPage/MyFavoritesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { RecipePreview } from "../../../components/UserPage/ListItems/RecipePreview/RecipePreview";
import { fetchFavoritesRecipes } from "../../../redux/recipes/recipesOperations";
import {
  selectFavoritesRecipes,
  selectRecipesPage,
  selectRecipesLimit,
  selectRecipesTotalPages,
  setRecipesPage,
} from "../../../redux/recipes/recipesSlice";
import styles from "./MyFavoritesPage.module.css";

export default function MyFavoritesPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectFavoritesRecipes) || [];
  const page = useSelector(selectRecipesPage);
  const limit = useSelector(selectRecipesLimit);
  const totalPages = useSelector(selectRecipesTotalPages);

  useEffect(() => {
    dispatch(fetchFavoritesRecipes({ page, limit }));
  }, [dispatch, page, limit]);

  const onPageChange = (nextPage) => {
    dispatch(setRecipesPage(nextPage));
  };

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
            onOpen={() => {}}
            onDelete={() => {
              // e.g. remove from favorites
            }}
          />
        )}
      />
    </div>
  );
}
