const RecipeInfo = ({ recipe }) => {
    const handleFavoritesChange = () => {};
    
    return (
         <>
          <img src={recipe.thumb} width="343" height="318" />
          <h3>{recipe.title}</h3>
          <ul>
            <li>{recipe.category}</li>
            <li>{recipe.time} min</li>
          </ul>
          <p>{recipe.description}</p>
          <div>
            <p>Created by:</p>
            <p>{recipe.owner.name}</p>
          </div>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredientsDetailed.map((ingredient) => {
              return (
                <div>
                  <img src={ingredient.img} width="55" height="55" />
                  <p>{ingredient.name}</p>
                  <p>{ingredient.measure}</p>
                </div>
              );
            })}
          </ul>

          <h3>Recipe Preparation</h3>
          <p>{recipe.instructions}</p>

          <button onClick={handleFavoritesChange}>ADD TO FAVORITES</button>
        </>
    );
};

export default RecipeInfo;