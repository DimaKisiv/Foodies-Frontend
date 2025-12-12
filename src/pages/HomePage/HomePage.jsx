import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPopularRecipes} from "../../redux/store/recipes/recipesOperations";
import {fetchCategories} from "../../redux/store/categories/categoriesOperations";
import Loader from "../../components/shared/Loader/Loader";
import {
  selectPopularRecipes,
  selectRecipesStatus,
} from "../../redux/store/recipes/recipesSlice";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/store/categories/categoriesSlice";
import SectionTitle from "../../components/shared/Typography/SectionTitle/SectionTitle.jsx";
import SectionSubtitle from "../../components/shared/Typography/SectionSubtitle/SectionSubtitle.jsx";
import CategoryList from "../../components/Categories/CategoryList/CategoryList.jsx";

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
      <h2>Home</h2>
      <section>
        <h3>Popular Recipes</h3>
        {recipesStatus === "loading" && <Loader/>}
        <ul>
          {popular?.map((r) => (
            <li key={r.id || r._id || r.name}>{r.name || r.title}</li>
          ))}
        </ul>
      </section>
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
