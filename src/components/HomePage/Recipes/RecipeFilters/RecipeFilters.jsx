import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipesCategory } from "../../../../redux/recipes/recipesSlice.js";
import { selectIngredientsItems, selectIngredientsStatus } from "../../../../redux/ingredients/ingredientsSlice.js";
import { selectAreasItems, selectAreasStatus } from "../../../../redux/areas/areasSlice.js";
import { fetchRecipes } from "../../../../redux/recipes/recipesOperations.js";
import Select from "../../../shared/Select/Select.jsx";
import css from "./RecipeFilters.module.css";

const RecipeFilters = () => {
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
      category: category,
      page: 1
    }));
  }

  const handleAreasChange = ({ name }) => {
    setCurrentArea(name);
    dispatch(fetchRecipes({
      ingredientIds: currentIngredient,
      area: name,
      category: category,
      page: 1
    }));
  }

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
