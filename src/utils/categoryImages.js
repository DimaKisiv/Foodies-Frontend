import beefImg from '../assets/images/categories/Beef.jpg';
import breakfastImg from '../assets/images/categories/Breakfast.jpg';
import chickenImg from '../assets/images/categories/Chicken.jpg';
import dessertsImg from '../assets/images/categories/Desserts.jpg';
import goatImg from '../assets/images/categories/Goat.jpg';
import lambImg from '../assets/images/categories/Lamb.jpg';
import miscellaneousImg from '../assets/images/categories/Miscellaneous.jpg';
import pastaImg from '../assets/images/categories/Pasta.jpg';
import porkImg from '../assets/images/categories/Pork.jpg';
import seaFoodImg from '../assets/images/categories/Seafood.jpg';
import sideImg from '../assets/images/categories/Side.jpg';
import soupImg from '../assets/images/categories/Soup.jpg';
import starterImg from '../assets/images/categories/Starter.jpg';
import veganImg from '../assets/images/categories/Vegan.jpg';
import vegetarianImg from '../assets/images/categories/Vegetarian.jpg';


export const categoryImages = {
    "Beef": beefImg,
    "Breakfast": breakfastImg,
    "Chicken": chickenImg,
    "Dessert": dessertsImg,
    "Goat": goatImg,
    "Lamb": lambImg,
    "Miscellaneous": miscellaneousImg,
    "Pasta": pastaImg,
    "Pork": porkImg,
    "Seafood": seaFoodImg,
    "Side": sideImg,
    "Soup": soupImg,
    "Starter": starterImg,
    "Vegan": veganImg,
    "Vegetarian": vegetarianImg,
};

// Функція-помічник (опціонально), щоб не впало, якщо картинки немає
export const getCategoryImage = (categoryName) => {
    return categoryImages[categoryName] || categoryImages["Beef"]; // Поверне Beef, якщо картинку не знайдено
};