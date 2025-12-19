import AvatarButton from "../../../shared/Button/AvatarButton/AvatarButton.jsx";
import RoundButton from "../../../shared/Button/RoundButton/RoundButton.jsx";
import css from "./RecipeCard.module.css";

const RecipeCard = ({ recipe, isLoading, isFavorite, onFavoriteClick, onDetailsClick, onAuthorClick }) => (
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
        <AvatarButton
          image={recipe.owner.avatar}
          name={recipe.owner.name}
          onClick={() => onAuthorClick(recipe.owner.id)}
        />
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

export default RecipeCard;
