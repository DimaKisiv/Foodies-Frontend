import Avatar from "boring-avatars";
import RoundButton from "../../../shared/Button/RoundButton/RoundButton.jsx";
import css from "./RecipeCard.module.css";

const RecipeCard = ({ recipe, isLoading, isFavorite, onFavoriteClick, onDetailsClick,  }) => {
  return (
    <div className={css.container}>
      <div className={css.image}>
        <img src={recipe.thumb} alt={recipe.title} />
      </div>
      <div className={css.title}>
        <h4>{recipe.title}</h4>
        <p>{recipe.instructions}</p>
      </div>
      <div className={css.ui}>
        <div className={css.author}>
          <div className={css.avatar}>
            {recipe.owner.avatar
              ? <img src={recipe.owner.avatar} alt={recipe.owner.name} />
              : <Avatar name={recipe.owner.name} size={40} variant="pixel" />}
          </div>
          <span>{recipe.owner.name}</span>
        </div>
        <div className={css.buttons}>
          <RoundButton
            iconId="icon-heart"
            onClick={() => onFavoriteClick(recipe.id)}
            isLoading={isLoading}
            altMode={isFavorite}
          />
          <RoundButton
            iconId="icon-arrow-up-right"
            onClick={() => onDetailsClick(recipe.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
