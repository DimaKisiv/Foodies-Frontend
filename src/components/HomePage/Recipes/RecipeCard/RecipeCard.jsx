import RoundButton from "../../../shared/Button/RoundButton/RoundButton.jsx";
import css from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className={css.container}>
      <div className={css.image}>
        <img src={recipe.thumb} alt=""/>
      </div>
      <div className={css.title}>
        <h4>{recipe.title}</h4>
        <p>{recipe.instructions}</p>
      </div>
      <div className={css.ui}>
        <div className={css.author}>
          <div className={css.avatar}>
            <img src={recipe.owner.avatar} alt=""/>
          </div>
          <span>{recipe.owner.name}</span>
        </div>
        <div className={css.buttons}>
          <RoundButton iconId="icon-heart" onClick={() => {}} />
          <RoundButton iconId="icon-arrow-up-right" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
