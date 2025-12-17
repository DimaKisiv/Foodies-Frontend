import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredientsItems, selectIngredientsStatus } from "../../../redux/ingredients/ingredientsSlice.js";
import { selectAreasItems, selectAreasStatus } from "../../../redux/areas/areasSlice.js";
import { selectRecipeItems, selectRecipesStatus } from "../../../redux/recipes/recipesSlice.js";
import { fetchIngredients } from "../../../redux/ingredients/ingredientsOperations.js";
import { fetchAreas } from "../../../redux/areas/areasOperations.js";
import { fetchRecipes } from "../../../redux/recipes/recipesOperations.js";
import Icon from "../../../components/shared/Icon/Icon.jsx";
import Subtitle from "../../../components/shared/Subtitle/Subtitle.jsx";
import MainTitle from "../../../components/shared/MainTitle/MainTitle.jsx";
import RecipeFilters from "../../../components/HomePage/Recipes/RecipeFilters/RecipeFilters.jsx";
import RecipeList from "../../../components/HomePage/Recipes/RecipeList/RecipeList.jsx";
import Loader from "../../../components/shared/Loader/Loader.jsx";
import css from './Recipes.module.css';

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();

  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const ingredients = useSelector(selectIngredientsItems);
  const areasStatus = useSelector(selectAreasStatus);
  const areas = useSelector(selectAreasItems);

  const recipesStatus = useSelector(selectRecipesStatus);
  const recipes = useSelector(selectRecipeItems);

  useEffect(() => {
    dispatch(fetchRecipes({ category: name }));
  }, [dispatch, name]);

  useEffect(() => {
    if (ingredients.length === 0 || areas.length === 0) {
      dispatch(fetchIngredients());
      dispatch(fetchAreas());
    }
  }, [dispatch, ingredients, areas]);

  return (
    <section className={css.container}>
      <button
        className={css.backBtn}
        onClick={() => navigate("/")}
      >
        <Icon id="icon-arrow-left-frameless" />
        back
      </button>
      <div className={css.header}>
        <MainTitle>{name}</MainTitle>
        <Subtitle maxWidth={540}>
          Go on a taste journey, where every sip is a sophisticated creative chord,
          and every dessert is an expression of the most refined gastronomic desires.
        </Subtitle>
      </div>
      {recipesStatus === "loading" && <Loader/>}
      {recipes.length > 0 &&
        <div className={css.content}>
          <RecipeFilters />
          <RecipeList />
        </div>}
    </section>
  );
}

export default Recipes;
