import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipeItems } from "../../../redux/recipes/recipesSlice.js";
import { fetchRecipes } from "../../../redux/recipes/recipesOperations.js";
import Icon from "../../../components/shared/Icon/Icon.jsx";
import Subtitle from "../../../components/shared/Subtitle/Subtitle.jsx";
import MainTitle from "../../../components/shared/MainTitle/MainTitle.jsx";
import RecipeCard from "./RecipeCard.jsx";
import css from './Recipes.module.css';

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useParams();

  const recipes = useSelector(selectRecipeItems);

  useEffect(() => {
    dispatch(fetchRecipes({ category: name }));
  }, [dispatch, name]);

  return (
    <div className={css.container}>
      <button
        className={css.backBtn}
        onClick={() => navigate("/")}
      >
        <Icon id="icon-arrow-left-frameless" />
        back
      </button>
      <div className={css.header}>
        <MainTitle>desserts</MainTitle>
        <Subtitle maxWidth={540}>
          Go on a taste journey, where every sip is a sophisticated creative chord,
          and every dessert is an expression of the most refined gastronomic desires.
        </Subtitle>
      </div>
      <div className={css.content}>
        <div className={css.filters}></div>
        {recipes.length > 0 && <div className={css.list}>
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />)
          })}
        </div>}
      </div>
    </div>
  );
}

export default Recipes;
