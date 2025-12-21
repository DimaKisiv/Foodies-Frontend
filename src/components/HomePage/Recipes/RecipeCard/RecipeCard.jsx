import AvatarButton from "../../../shared/Button/AvatarButton/AvatarButton.jsx";
import RoundButton from "../../../shared/Button/RoundButton/RoundButton.jsx";
import { Link } from "react-router-dom";
import css from "./RecipeCard.module.css";
import foodPlaceholder from "../../../../assets/food.png";
import ResponsiveImage from "../../../shared/ResponsiveImage/ResponsiveImage.jsx";

const RecipeCard = ({
  recipe,
  isLoading,
  isFavorite,
  onFavoriteClick,
  onDetailsClick,
  onAuthorClick,
}) => {
  const to = `/recipe/${recipe.id}`;

  return (
    <div className={css.container}>
      <Link
        to={to}
        className={css.linkContents}
        aria-label={recipe?.title || "Recipe"}
      >
        <div className={css.image}>
          <ResponsiveImage
            src={recipe?.thumb}
            fallbackSrc={foodPlaceholder}
            alt={recipe?.title || "Recipe"}
          />
        </div>
        <div className={css.title}>
          <h4>{recipe.title}</h4>
          <p>{recipe.instructions}</p>
        </div>
      </Link>

      <div className={css.ui}>
        <div className={css.author}>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAuthorClick(recipe.owner.id);
            }}
          >
            <AvatarButton
              image={recipe.owner.avatar}
              name={recipe.owner.name}
            />
          </div>
          <span>{recipe.owner.name}</span>
        </div>

        <div className={css.buttons}>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavoriteClick(recipe.id);
            }}
          >
            <RoundButton
              iconId="icon-heart"
              isLoading={isLoading}
              altMode={isFavorite}
            />
          </div>

          <Link
            to={to}
            className={css.link}
            onClick={(e) => {
              if (
                e.button === 0 &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                !e.altKey
              ) {
                e.preventDefault();
                onDetailsClick(recipe.id);
              }
            }}
          >
            <RoundButton iconId="icon-arrow-up-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
