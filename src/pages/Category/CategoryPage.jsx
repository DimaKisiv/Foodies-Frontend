import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../redux/store/categories/categoriesOperations";
import {
    selectCategoriesItems,
    selectCategoriesStatus,
} from "../../redux/store/categories/categoriesSlice";
import Loader from "../../components/shared/Loader/Loader";
import SectionTitle from "../../components/shared/Typography/SectionTitle/SectionTitle.jsx";
import SectionSubtitle from "../../components/shared/Typography/SectionSubtitle/SectionSubtitle.jsx";
import CategoryList from "../../components/Categories/CategoryList/CategoryList.jsx";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategoriesItems);
    const status = useSelector(selectCategoriesStatus);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

// Функція, яку ми передаємо вниз у CategoryList
    const handleCategoryClick = async (categoryName) => {
        console.log(`User clicked: ${categoryName}`);
    };

    return (
        <section>
            <SectionTitle>Categories</SectionTitle>
            <SectionSubtitle>Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
                combine
                taste, style and the warm atmosphere of the kitchen.</SectionSubtitle>
            {status === "loading" && <Loader/>}
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
