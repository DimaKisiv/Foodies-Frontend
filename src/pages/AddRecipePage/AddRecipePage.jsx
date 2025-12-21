import AddRecipeForm from "../../components/AddRecipePage/AddRecipeForm/AddRecipeForm";
import MainTitle from "../../components/shared/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/shared/Subtitle/Subtitle.jsx";
import Breadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";
import styles from "./AddRecipePage.module.css";

const AddRecipePage = () => {
  return (
    <section className={styles["add-recipe-page"] + " " + "container"}>
      <Breadcrumbs />
      <MainTitle>ADD RECIPE</MainTitle>
      <Subtitle maxWidth={560}>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>

      <AddRecipeForm />
    </section>
  );
};

export default AddRecipePage;
