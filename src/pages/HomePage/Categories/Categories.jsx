import { useSelector } from "react-redux";
import MainTitle from "../../../components/Shared/MainTitle/MainTitle.jsx";
import Subtitle from "../../../components/Shared/Subtitle/Subtitle.jsx";
import Loader from "../../../components/Shared/Loader/Loader.jsx";
import CategoryList from "../../../components/HomePage/Categories/CategoryList/CategoryList.jsx";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../../redux/categories/categoriesSlice.js";

const Categories = () => {
  const categories = useSelector(selectCategoriesItems);
  const categoriesStatus = useSelector(selectCategoriesStatus);

  return (
    <section>
      <MainTitle>Categories</MainTitle>
      <Subtitle maxWidth={531}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      {categoriesStatus === "loading" && <Loader />}
      {categories.length > 0 && <CategoryList categories={categories} />}
    </section>
  );
};

export default Categories;
