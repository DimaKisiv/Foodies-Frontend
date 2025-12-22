import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredientsItems } from "../../../redux/ingredients/ingredientsSlice.js";
import { selectAreasItems } from "../../../redux/areas/areasSlice.js";
import {
  selectRecipeItems,
  selectRecipesStatus,
} from "../../../redux/recipes/recipesSlice.js";
import { clearRecipesList } from "../../../redux/recipes/recipesSlice.js";
import { fetchIngredients } from "../../../redux/ingredients/ingredientsOperations.js";
import { fetchAreas } from "../../../redux/areas/areasOperations.js";
import { fetchRecipes } from "../../../redux/recipes/recipesOperations.js";
import Icon from "../../../components/shared/Icon/Icon.jsx";
import Subtitle from "../../../components/shared/Subtitle/Subtitle.jsx";
import MainTitle from "../../../components/shared/MainTitle/MainTitle.jsx";
import RecipeFilters from "../../../components/HomePage/Recipes/RecipeFilters/RecipeFilters.jsx";
import RecipeList from "../../../components/HomePage/Recipes/RecipeList/RecipeList.jsx";
import Loader from "../../../components/shared/Loader/Loader.jsx";
import NoItemsFound from "../../../components/shared/NoItemsFound/NoItemsFound.jsx";
import css from "./Recipes.module.css";

const Recipes = () => {
  const ingredients = useSelector(selectIngredientsItems);
  const areas = useSelector(selectAreasItems);
  const recipesStatus = useSelector(selectRecipesStatus);
  const recipes = useSelector(selectRecipeItems);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("category");
  const dispatch = useDispatch();
  const recipesRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (name) {
      dispatch(clearRecipesList(name));
      dispatch(fetchRecipes({ category: name }));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (ingredients.length === 0 || areas.length === 0) {
      dispatch(fetchIngredients());
      dispatch(fetchAreas());
    }
  }, [dispatch, ingredients, areas]);

  return (
    <section className={css.container} ref={recipesRef}>
      <button className={css.backBtn} onClick={() => navigate("/")}>
        <Icon id="icon-arrow-left-frameless" />
        back
      </button>
      <div className={css.header}>
        <div className={css.title}>
          <MainTitle>{name || "Category"}</MainTitle>
          {recipesStatus === "loading" && <Loader />}
        </div>
        <Subtitle maxWidth={540}>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>
      <div className={css.content}>
        <RecipeFilters />
        {recipes?.length > 0 && <RecipeList sectionRef={recipesRef} />}
        {recipes?.length === 0 && <NoItemsFound />}
      </div>
    </section>
  );
};

export default Recipes;
