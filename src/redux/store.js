import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/auth/authSlice";
import { usersReducer } from "./store/users/usersSlice";
import { categoriesReducer } from "./store/categories/categoriesSlice";
import { ingredientsReducer } from "./store/ingredients/ingredientsSlice";
import { areasReducer } from "./store/areas/areasSlice";
import { recipesReducer } from "./store/recipes/recipesSlice";
import { testimonialsReducer } from "./store/testimonials/testimonialsSlice";
import { allReducer } from "./store/all/allSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    areas: areasReducer,
    recipes: recipesReducer,
    testimonials: testimonialsReducer,
    all: allReducer,
  },
});

export default store;
