import { useId } from "react";
import { useSelector } from "react-redux";
import { selectIngredientsItems } from "../../../../redux/ingredients/ingredientsSlice.js";
import { selectAreasItems } from "../../../../redux/areas/areasSlice.js";
import css from "./RecipeFilters.module.css";
import Select from "../../../shared/Select/Select.jsx";

const RecipeFilters = () => {
  const ingredientsId = useId();
  const areaId = useId();
  const ingredients = useSelector(selectIngredientsItems);
  const areas = useSelector(selectAreasItems);

  return (
    <div className={css.container}>
      <Select id={ingredientsId} name="Ingredients" options={ingredients} />
      <Select id={areaId} name="Areas" options={areas} />
    </div>
  );
}

export default RecipeFilters;
