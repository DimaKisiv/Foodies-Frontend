import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipePages, selectRecipesCategory } from "../../../../redux/recipes/recipesSlice.js";
import { fetchRecipes } from "../../../../redux/recipes/recipesOperations.js";
import PageButton from "../../../shared/Button/PageButton/PageButton.jsx";
import css from "./RecipePagination.module.css";

const RecipePagination = () => {
  const [ pages, setPages ] = useState([]);
  const [ activePage, setActivePage ] = useState(1);
  const category = useSelector(selectRecipesCategory);
  const pageCount = useSelector(selectRecipePages);
  const dispatch = useDispatch();

  const clickHandler = (value) => {
    setActivePage(value);
    dispatch(fetchRecipes({
      category: category,
      page: value
    }));
  }

  useEffect(() => {
    setPages(Array(pageCount).fill(0).map((_, i) => i + 1));
  }, [pageCount]);

  return (
    <div className={css.container}>
      {pages.map((page) => (
        <PageButton
          key={page}
          pageNumber={page}
          isActive={activePage === page}
          onClick={clickHandler}
        />
      ))}
    </div>
  );
}

export default RecipePagination;
