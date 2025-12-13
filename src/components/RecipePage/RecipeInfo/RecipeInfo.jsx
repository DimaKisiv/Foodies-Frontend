import styles from "./RecipeInfo.module.css";
import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipeMainInfo from "./RecipeMainInfo/RecipeMainInfo";
import RecipePreparation from "./RecipePreparation/RecipePreparation";

const RecipeInfo = ({ recipe }) => {
  return (
    <div className={styles.recipe}>
      <RecipeMainInfo recipe={recipe} owner={recipe.owner} />
      <RecipeIngredients ingredients={recipe.ingredientsDetailed} />
      <RecipePreparation
        instructions={recipe.instructions}
        isFavorite={false}
      />
    </div>
  );
};

export default RecipeInfo;
