import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loader from "./components/Shared/Loader/Loader";
import GlobalReduxLoader from "./components/Shared/GlobalReduxLoader/GlobalReduxLoader";
import SharedLayout from "./components/Layout/SharedLayout";
import FollowersPage from "./pages/UserPage/FollowersPage/FollowersPage";
import FollowingPage from "./pages/UserPage/FollowingPage/FollowingPage";
import Header from "./components/Header/Header.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RecipePage = lazy(() => import("./pages/RecipePage/RecipePage"));
const AddRecipePage = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));
const UserPage = lazy(() => import("./pages/UserPage/UserPage"));
const MyRecipesPage = lazy(() =>
  import("./pages/UserPage/MyRecipesPage/MyRecipesPage")
);
const MyFavoritesPage = lazy(() =>
  import("./pages/UserPage/MyFavoritesPage/MyFavoritesPage")
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <GlobalReduxLoader />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipe/add" element={<AddRecipePage />} />
              <Route path="user/:id" element={<UserPage />}>
                <Route index element={<MyRecipesPage />} />
                <Route path="my-recipes" element={<MyRecipesPage />} />
                <Route path="my-favorites" element={<MyFavoritesPage />} />
                <Route path="followers" element={<FollowersPage />} />
                <Route path="following" element={<FollowingPage />} />
                <Route
                  path="*"
                  element={<Navigate to="my-recipes" replace />}
                />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
