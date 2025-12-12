import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRecipes } from "../../redux/store/recipes/recipesOperations";
import { fetchCategories } from "../../redux/store/categories/categoriesOperations";
import Loader from "../../components/shared/Loader/Loader";
import {
  selectPopularRecipes,
  selectRecipesStatus,
} from "../../redux/store/recipes/recipesSlice";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/store/categories/categoriesSlice";
import Hero from "../../components/Hero/Hero.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const popular = useSelector(selectPopularRecipes);
  const categories = useSelector(selectCategoriesItems);
  const recipesStatus = useSelector(selectRecipesStatus);
  const categoriesStatus = useSelector(selectCategoriesStatus);

  useEffect(() => {
    dispatch(fetchPopularRecipes());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <main>
      <Hero />

      <h2>Home</h2>
      <section>
        <h3>Popular Recipes</h3>
        {recipesStatus === "loading" && <Loader />}
        <ul>
          {popular?.map((r) => (
            <li key={r.id || r._id || r.name}>{r.name || r.title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Categories</h3>
        {categoriesStatus === "loading" && <Loader />}
        <ul>
          {categories?.map((c) => (
            <li key={c.id || c._id || c.name}>{c.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
