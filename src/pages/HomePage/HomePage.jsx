import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularRecipes,
  fetchRecipes,
} from "../../redux/recipes/recipesOperations";
import { fetchCategories } from "../../redux/categories/categoriesOperations";
import Loader from "../../components/Shared/Loader/Loader";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/categories/categoriesSlice";
import MainTitle from "../../components/shared/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/shared/Subtitle/Subtitle.jsx";
import CategoryList from "../../components/HomePage/Categories/CategoryList/CategoryList.jsx";
import {
  selectRecipeItems,
  selectRecipesStatus,
} from "../../redux/recipes/recipesSlice";
import Hero from "../../components/HomePage/Hero/Hero";
import TestimonialsCarousel from "../../components/Testimonials/TestimonialsCarousel/TestimonialsCarousel.jsx";
import {
  selectTestimonialsItems,
  selectTestimonialsStatus
} from "../../redux/testimonials/testimonialsSlice.js";
import { fetchTestimonials } from "../../redux/testimonials/testimonialsOperations.js";
import css from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const recipes = useSelector(selectRecipeItems);
  const recipesStatus = useSelector(selectRecipesStatus);
  const testimonials = useSelector(selectTestimonialsItems);
  const testimonialsStatus = useSelector(selectTestimonialsStatus);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchPopularRecipes());
    dispatch(fetchCategories());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const handleSelectCategory = (name) => (e) => {
    e.preventDefault();
    setSelectedCategory(name);
    dispatch(fetchRecipes({category: name}));
  };

  return (
    <main>
      <Hero/>

      <h2>Home</h2>
      <h3>
        <a href="http://localhost:5173/recipe/WqTbctwYxTVNYiRc5hvTD">
          Recipe Page
        </a>
      </h3>
      <section>
        <MainTitle>Categories</MainTitle>
        <Subtitle maxWidth={531}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
          combine taste, style and the warm atmosphere of the kitchen.
        </Subtitle>
        {categoriesStatus === "loading" && <Loader/>}
        {categories.length > 0 && <CategoryList categories={categories}/>}
      </section>

      {selectedCategory && (
        <section id="recipes" style={{marginTop: 16}}>
          <h3>Recipes in {selectedCategory}</h3>
          {recipesStatus === "loading" && <Loader/>}
          {recipesStatus === "failed" && (
            <p>Failed to load recipes. Please try again.</p>
          )}
          {recipesStatus === "succeeded" && recipes?.length === 0 && (
            <p>No recipes found for this category.</p>
          )}
          {recipes?.length > 0 && recipesStatus === "succeeded" && (
            <ul style={{listStyle: "none", padding: 0}}>
              {recipes.map((r) => (
                <li
                  key={r.id || r._id || r.slug || `${r.title}-${r.name}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <a
                    href={`/recipe/${r.id || r._id || r.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {r.thumb && (
                      <img
                        src={r.thumb}
                        alt={r.title || r.name}
                        width="80"
                        style={{objectFit: "cover", borderRadius: 8}}
                      />
                    )}
                    <div>
                      <div style={{fontWeight: 600}}>
                        {r.title || r.name || "Untitled Recipe"}
                      </div>
                      {r.description && (
                        <div style={{color: "#666"}}>{r.description}</div>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section className={css.testimonials}>
        <div className={css.testimonialsWrapper}>
          <h5>What our customer say</h5>
          <h2>Testimonials</h2>
          {testimonialsStatus === "loading" && <Loader/>}
          {testimonials.length > 0 && <TestimonialsCarousel slideList={testimonials}/>}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
