import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRecipes } from "../../redux/recipes/recipesOperations";
import { fetchCategories } from "../../redux/categories/categoriesOperations";
import Loader from "../../components/Shared/Loader/Loader";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/categories/categoriesSlice";
import Hero from "../../components/Hero/Hero.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);
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
