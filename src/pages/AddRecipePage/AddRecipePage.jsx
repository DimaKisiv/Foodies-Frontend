import AddRecipeForm from "../../components/AddRecipePage/AddRecipeForm/AddRecipeForm";
import MainTitle from "../../components/Shared/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/Shared/Subtitle/Subtitle.jsx";

const AddRecipePage = () => {
  return (
    <section>
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
