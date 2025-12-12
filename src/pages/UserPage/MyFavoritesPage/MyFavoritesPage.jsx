import { useSelector } from "react-redux";
import {
  selectPopularRecipes,
  selectRecipesStatus,
} from "../../../redux/recipes/recipesSlice";
import Loader from "../../../components/Shared/Loader/Loader";

const MyFavoritesPage = () => {
  const favorites = useSelector(selectPopularRecipes); // placeholder list
  const status = useSelector(selectRecipesStatus);
  return (
    <section>
      <h2>My Favorites</h2>
      {status === "loading" && <Loader />}
      <ul>
        {favorites?.map((r) => (
          <li key={r.id || r._id || r.name}>{r.name || r.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default MyFavoritesPage;
