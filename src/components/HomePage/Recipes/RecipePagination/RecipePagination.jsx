import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipePages, selectRecipesCategory } from "../../../../redux/recipes/recipesSlice.js";
import { fetchRecipes } from "../../../../redux/recipes/recipesOperations.js";
import { getPageArray } from "../../../../utils/recipes.js";
import PageButton from "../../../shared/Button/PageButton/PageButton.jsx";
import css from "./RecipePagination.module.css";

const RecipePagination = () => {
  const [ activePage, setActivePage ] = useState(1);
  const category = useSelector(selectRecipesCategory);
  const pageCount = useSelector(selectRecipePages);
  const dispatch = useDispatch();

  const pageButtons = useMemo(() => {
    const pageArray = getPageArray(activePage, pageCount);
    if (pageArray.length <= 1) {
      return null;
    }
    return pageArray.map((page)=>{
      if (page === "...") {
        return <span>. . .</span>;
      }
      const pageNumber = Number(page);
      return <PageButton
        key={pageNumber}
        pageNumber={pageNumber}
        isActive={activePage === pageNumber}
        onClick={(value) => {
          setActivePage(value);
          dispatch(fetchRecipes({
            category: category,
            page: value
          }));
        }}
      />
    })
  },[activePage, pageCount, category, dispatch]);

  return (
    <div className={css.container}>
      {pageButtons}
    </div>
  );
}

export default RecipePagination;
