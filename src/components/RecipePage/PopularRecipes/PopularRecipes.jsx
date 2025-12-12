import styles from "./PopularRecipes.module.css";
import { useSelector } from "react-redux";
import {
  selectPopularRecipes,
  selectRecipesStatus,
} from "../../../redux/recipes/recipesSlice";
import Loader from "../../Shared/Loader/Loader";

const PopularRecipes = () => {
  const popular = useSelector(selectPopularRecipes);
  const recipesStatus = useSelector(selectRecipesStatus);

  return (
    <section>
      <h3>Popular Recipes</h3>
      {recipesStatus === "loading" && <Loader />}
      <ul>
        {popular?.map((r) => (
          <li key={r.id || r._id || r.name}>{r.name || r.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default PopularRecipes;
