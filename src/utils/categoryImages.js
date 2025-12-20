const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const categoryFileNames = {
  Beef: "beef.jpg",
  Breakfast: "breakfast.jpg",
  Chicken: "chicken.jpg",
  Dessert: "desserts.jpg",
  Goat: "goat.jpg",
  Lamb: "lamb.jpg",
  Miscellaneous: "miscellaneous.jpg",
  Pasta: "pasta.jpg",
  Pork: "pork.jpg",
  Seafood: "seafood.jpg",
  Side: "side.jpg",
  Soup: "soup.jpg",
  Starter: "starter.jpg",
  Vegan: "vegan.jpg",
  Vegetarian: "vegetarian.jpg",
};

export const getCategoryImage = (categoryName) => {
  const backendDomain = BASE_URL.replace(/\/api\/?$/, "");
  const fileName = categoryFileNames[categoryName];

  if (!fileName) {
    return `${backendDomain}/categories/beef.jpg`;
  }

  return `${backendDomain}/categories/${fileName}`;
};
