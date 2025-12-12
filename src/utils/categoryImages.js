import beefImg from '../assets/images/categories/beef.jpg';
import breakfastImg from '../assets/images/categories/breakfast.jpg';
import chickenImg from '../assets/images/categories/chicken.jpg';
import dessertsImg from '../assets/images/categories/desserts.jpg';
import goatImg from '../assets/images/categories/goat.jpg';
import lambImg from '../assets/images/categories/lamb.jpg';
import miscellaneousImg from '../assets/images/categories/miscellaneous.jpg';
import pastaImg from '../assets/images/categories/pasta.jpg';
import porkImg from '../assets/images/categories/pork.jpg';
import seaFoodImg from '../assets/images/categories/seafood.jpg';
import sideImg from '../assets/images/categories/side.jpg';
import soupImg from '../assets/images/categories/soup.jpg';
import starterImg from '../assets/images/categories/starter.jpg';
import veganImg from '../assets/images/categories/vegan.jpg';
import vegetarianImg from '../assets/images/categories/vegetarian.jpg';


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