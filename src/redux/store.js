import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { usersReducer } from "./users/usersSlice";
import { categoriesReducer } from "./categories/categoriesSlice";
import { ingredientsReducer } from "./ingredients/ingredientsSlice";
import { areasReducer } from "./areas/areasSlice";
import { recipesReducer } from "./recipes/recipesSlice";
import { testimonialsReducer } from "./testimonials/testimonialsSlice";
import { paginationReducer } from "./pagination/paginationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    areas: areasReducer,
    recipes: recipesReducer,
    testimonials: testimonialsReducer,
    pagination: paginationReducer,
  },
});

export default store;
