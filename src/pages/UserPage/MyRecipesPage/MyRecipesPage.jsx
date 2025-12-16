// src/pages/UserPage/MyRecipesPage/MyRecipesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ListItems } from "../../../components/UserPage/ListItems/ListItems";
import { RecipePreview } from "../../../components/UserPage/ListItems/RecipePreview/RecipePreview";
import {
  fetchRecipes,
  fetchOwnRecipes,
} from "../../../redux/recipes/recipesOperations";
import {
  selectRecipeItems,
  selectRecipesPage,
  selectRecipesLimit,
  selectRecipesTotalPages,
  setRecipesPage,
} from "../../../redux/recipes/recipesSlice";
import styles from "./MyRecipesPage.module.css";

export default function MyRecipesPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const items = useSelector(selectRecipeItems) || [];
  const page = useSelector(selectRecipesPage);
  const limit = useSelector(selectRecipesLimit);
  const totalPages = useSelector(selectRecipesTotalPages);

  useEffect(() => {
    if (params.id) {
      // Viewing another user's profile: fetch by author id
      dispatch(fetchRecipes({ author: params.id, page, limit }));
      return;
    }
    // Own profile: fetch own recipes via dedicated endpoint
    dispatch(fetchOwnRecipes({ page, limit }));
  }, [dispatch, params.id, page, limit]);
  const onPageChange = (nextPage) => {
    dispatch(setRecipesPage(nextPage));
  };

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
              // TODO navigate to recipe details
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
