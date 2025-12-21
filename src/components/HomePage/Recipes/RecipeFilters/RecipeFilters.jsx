import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipesCategory } from "../../../../redux/recipes/recipesSlice.js";
import { selectIngredientsItems, selectIngredientsStatus } from "../../../../redux/ingredients/ingredientsSlice.js";
import { selectAreasItems, selectAreasStatus } from "../../../../redux/areas/areasSlice.js";
import { fetchRecipes } from "../../../../redux/recipes/recipesOperations.js";
import Select from "../../../shared/Select/Select.jsx";
import css from "./RecipeFilters.module.css";

const RecipeFilters = () => {
  const [ currentCategory, setCurrentCategory ] = useState("");
  const [ currentIngredient, setCurrentIngredient ] = useState("");
  const [ currentArea, setCurrentArea ] = useState("");
  const ingredientsId = useId();
  const areaId = useId();
  const category = useSelector(selectRecipesCategory);
  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const ingredients = useSelector(selectIngredientsItems);
  const areasStatus = useSelector(selectAreasStatus);
  const areas = useSelector(selectAreasItems);
  const dispatch = useDispatch();

  const handleIngredientsChange = ({ value }) => {
    setCurrentIngredient(value);
    dispatch(fetchRecipes({
      ingredientIds: value,
      area: currentArea,
      category: currentCategory,
      page: 1
    }));
  }

  const handleAreasChange = ({ name }) => {
    setCurrentArea(name ?? "");
    dispatch(fetchRecipes({
      ingredientIds: currentIngredient,
      area: name ?? "",
      category: currentCategory,
      page: 1
    }));
  }

  useEffect(() => {
    if (category && currentCategory !== category) {
      setCurrentCategory(category);
    }
  }, [category, currentCategory]);

  return (
    <div className={css.container}>
        <Select
          id={ingredientsId}
          name="Ingredients"
          options={ingredients}
          onChange={handleIngredientsChange}
          isLoading={ingredientsStatus === "loading"}
        />
        <Select
          id={areaId}
          name="Areas"
          options={areas}
          onChange={handleAreasChange}
          isLoading={areasStatus === "loading"}
        />
    </div>
  );
}

export default RecipeFilters;
