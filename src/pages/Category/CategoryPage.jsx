import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/store/categories/categoriesOperations";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/store/categories/categoriesSlice";
import Loader from "../../components/shared/Loader/Loader";
import MainTitle from "../../components/shared/Typography/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/shared/Typography/Subtitle/Subtitle.jsx";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);
  const status = useSelector(selectCategoriesStatus);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section>
        <MainTitle>Categories</MainTitle>
        <Subtitle>Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.</Subtitle>
      {status === "loading" && <Loader />}
      <ul>
        {categories?.map((c) => (
          <li key={c.id || c._id || c.name}>{c.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryPage;
