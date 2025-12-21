import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchPopularRecipes } from "../../redux/recipes/recipesOperations";
import { fetchCategories } from "../../redux/categories/categoriesOperations";
import { fetchTestimonials } from "../../redux/testimonials/testimonialsOperations.js";
import Hero from "../../components/HomePage/Hero/Hero";
import Categories from "./Categories/Categories.jsx";
import Recipes from "./Recipes/Recipes.jsx";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials.jsx";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularRecipes());
    dispatch(fetchCategories());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");

  return (
    <main>
      <Hero />
      {/* If category query present, show recipes; otherwise categories */}
      {categoryName ? <Recipes /> : <Categories />}
      <Testimonials />
    </main>
  );
};

export default HomePage;
