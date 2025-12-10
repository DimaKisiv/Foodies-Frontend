import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loader from "./components/shared/Loader/Loader";
import Navigation from "./components/Shared/Navigation/Navigation";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CategoryPage = lazy(() => import("./pages/Category/CategoryPage"));
const RecipePage = lazy(() => import("./pages/Recipe/RecipePage"));
const AddRecipePage = lazy(() => import("./pages/AddRecipe/AddRecipePage"));
const UserPage = lazy(() => import("./pages/User/UserPage"));
const MyRecipesPage = lazy(() => import("./pages/User/MyRecipesPage"));
const MyFavoritesPage = lazy(() => import("./pages/User/MyFavoritesPage"));

const GlobalLoader = () => {
  const isGlobalLoading = useSelector((state) =>
    Object.values(state || {}).some(
      (slice) =>
        slice && typeof slice === "object" && slice.status === "loading"
    )
  );
  if (!isGlobalLoading) return null;
  return (
    <div
      style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}
    >
      <Loader />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <GlobalLoader />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="user" element={<UserPage />}>
              <Route index element={<MyRecipesPage />} />
              <Route path="my-recipes" element={<MyRecipesPage />} />
              <Route path="my-favorites" element={<MyFavoritesPage />} />
              <Route path="*" element={<Navigate to="my-recipes" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
