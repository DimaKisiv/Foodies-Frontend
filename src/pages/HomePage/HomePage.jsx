import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { fetchPopularRecipes } from "../../redux/recipes/recipesOperations";
import { fetchCategories } from "../../redux/categories/categoriesOperations";
import Loader from "../../components/Shared/Loader/Loader";
import Hero from "../../components/HomePage/Hero/Hero";
import {
  selectTestimonialsItems,
  selectTestimonialsStatus
} from "../../redux/testimonials/testimonialsSlice.js";
import { fetchTestimonials } from "../../redux/testimonials/testimonialsOperations.js";
import TestimonialsCarousel from "../../components/HomePage/Testimonials/TestimonialsCarousel/TestimonialsCarousel.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectTestimonialsItems);
  const testimonialsStatus = useSelector(selectTestimonialsStatus);

  useEffect(() => {
    dispatch(fetchPopularRecipes());
    dispatch(fetchCategories());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return (
    <main>
      <Hero/>
      <Outlet />
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
