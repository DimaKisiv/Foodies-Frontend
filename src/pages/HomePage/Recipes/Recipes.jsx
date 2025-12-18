import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIngredientsItems,
  selectIngredientsStatus,
} from "../../../redux/ingredients/ingredientsSlice.js";
import {
  selectAreasItems,
  selectAreasStatus,
} from "../../../redux/areas/areasSlice.js";
import {
  selectRecipeItems,
  selectRecipesStatus,
} from "../../../redux/recipes/recipesSlice.js";
import { fetchIngredients } from "../../../redux/ingredients/ingredientsOperations.js";
import { fetchAreas } from "../../../redux/areas/areasOperations.js";
import { fetchRecipes } from "../../../redux/recipes/recipesOperations.js";
import Icon from "../../../components/Shared/Icon/Icon.jsx";
import Subtitle from "../../../components/Shared/Subtitle/Subtitle.jsx";
import MainTitle from "../../../components/Shared/MainTitle/MainTitle.jsx";
import RecipeFilters from "../../../components/HomePage/Recipes/RecipeFilters/RecipeFilters.jsx";
import RecipeList from "../../../components/HomePage/Recipes/RecipeList/RecipeList.jsx";
import Loader from "../../../components/Shared/Loader/Loader.jsx";
import NoItemsFound from "../../../components/Shared/NoItemsFound/NoItemsFound.jsx";
import css from "./Recipes.module.css";

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

  const isLoading = () => {
    return (
      ingredientsStatus === "loading" ||
      areasStatus === "loading" ||
      recipesStatus === "loading"
    );
  };

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
      <button className={css.backBtn} onClick={() => navigate("/")}>
        <Icon id="icon-arrow-left-frameless" />
        back
      </button>
      <div className={css.header}>
        <MainTitle>{name}</MainTitle>
        <Subtitle maxWidth={540}>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>
      <div className={css.content}>
        {isLoading() && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}
        <RecipeFilters />
        {recipes?.length > 0 && <RecipeList />}
        {recipes?.length === 0 && <NoItemsFound />}
      </div>
    </section>
  );
};

export default Recipes;
