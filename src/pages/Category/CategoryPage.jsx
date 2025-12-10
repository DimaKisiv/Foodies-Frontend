import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/store/categories/categoriesOperations";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/store/categories/categoriesSlice";
import Loader from "../../components/shared/Loader/Loader";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);
  const status = useSelector(selectCategoriesStatus);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section>
      <h2>Categories</h2>
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
