import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../redux/store/categories/categoriesOperations";
import {
    selectCategoriesItems,
    selectCategoriesStatus,
} from "../../redux/store/categories/categoriesSlice";
import Loader from "../../components/shared/Loader/Loader";
import MainTitle from "../../components/shared/Typography/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/shared/Typography/Subtitle/Subtitle.jsx";
import CategoryList from "../../components/Categories/CategoryList/CategoryList.jsx";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategoriesItems);
    const status = useSelector(selectCategoriesStatus);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

// 4. Функція, яку ми передаємо вниз у CategoryList
    const handleCategoryClick = async (categoryName) => {
        console.log(`User clicked: ${categoryName}`);
    };

    return (
        <section>
            <MainTitle>Categories</MainTitle>
            <Subtitle>Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine
                taste, style and the warm atmosphere of the kitchen.</Subtitle>
            {status === "loading" && <Loader/>}
            {/*<ul>*/}
            {/*  {categories?.map((c) => (*/}
            {/*    <li key={c.id || c._id || c.name}>{c.name}</li>*/}
            {/*  ))}*/}
            {/*</ul>*/}
            {categories && (
                <CategoryList
                    categories={categories}
                    onCategorySelect={handleCategoryClick}
                />
            )}
        </section>
    );
};

export default CategoryPage;
