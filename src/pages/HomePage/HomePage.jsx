import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRecipes } from "../../redux/recipes/recipesOperations";
import { fetchCategories } from "../../redux/categories/categoriesOperations";
import Loader from "../../components/Shared/Loader/Loader";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/categories/categoriesSlice";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle.jsx";
import SectionSubtitle from "../../components/shared/SectionSubtitle/SectionSubtitle.jsx";
import CategoryList from "../../components/HomePage/Categories/CategoryList/CategoryList.jsx";

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
      <h2>Home</h2>
      <section>
        <SectionTitle>Categories</SectionTitle>
        <SectionSubtitle>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
          combine taste, style and the warm atmosphere of the kitchen.
        </SectionSubtitle>
        {categoriesStatus === "loading" && <Loader/>}
        {categories.length > 0 && <CategoryList categories={categories}/>}
      </section>
    </main>
  );
};

export default HomePage;
