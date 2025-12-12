import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularRecipes,
  fetchRecipes,
} from "../../redux/recipes/recipesOperations";
import { fetchCategories } from "../../redux/categories/categoriesOperations";
import Loader from "../../components/Shared/Loader/Loader";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../redux/categories/categoriesSlice";
import {
  selectRecipeItems,
  selectRecipesStatus,
} from "../../redux/recipes/recipesSlice";
import Hero from "../../components/Hero/Hero.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const recipes = useSelector(selectRecipeItems);
  const recipesStatus = useSelector(selectRecipesStatus);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchPopularRecipes());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelectCategory = (name) => (e) => {
    e.preventDefault();
    setSelectedCategory(name);
    dispatch(fetchRecipes({ category: name }));
  };

  return (
    <main>
      <Hero />

      <h2>Home</h2>
      <h3>
        <a href="http://localhost:5173/recipe/WqTbctwYxTVNYiRc5hvTD">
          Recipe Page
        </a>
      </h3>
      <section>
        <h3>Categories</h3>
        {categoriesStatus === "loading" && <Loader />}
        {categories?.map((c) => (
          <span key={c.name} style={{ display: "inline-block", margin: 8 }}>
            <a href="#recipes" onClick={handleSelectCategory(c.name)}>
              <img
                width="100"
                src={`http://localhost:3000/categories/${c.name}.jpg`}
                alt={c.name}
              />
              <div style={{ textAlign: "center" }}>{c.name}</div>
            </a>
          </span>
        ))}
      </section>

      {selectedCategory && (
        <section id="recipes" style={{ marginTop: 16 }}>
          <h3>Recipes in {selectedCategory}</h3>
          {recipesStatus === "loading" && <Loader />}
          {recipesStatus === "failed" && (
            <p>Failed to load recipes. Please try again.</p>
          )}
          {recipesStatus === "succeeded" && recipes?.length === 0 && (
            <p>No recipes found for this category.</p>
          )}
          {recipes?.length > 0 && recipesStatus === "succeeded" && (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recipes.map((r) => (
                <li
                  key={r.id || r._id || r.slug || `${r.title}-${r.name}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <a
                    href={`/recipe/${r.id || r._id || r.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {r.thumb && (
                      <img
                        src={r.thumb}
                        alt={r.title || r.name}
                        width="80"
                        style={{ objectFit: "cover", borderRadius: 8 }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {r.title || r.name || "Untitled Recipe"}
                      </div>
                      {r.description && (
                        <div style={{ color: "#666" }}>{r.description}</div>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
};

export default HomePage;
