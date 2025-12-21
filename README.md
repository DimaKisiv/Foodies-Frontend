# Foodies - Frontend

This is the frontend client for **Foodies**, an educational group project designed to help users discover, share, and manage culinary recipes. It is a Single Page Application (SPA) built with React, providing a responsive and interactive user experience across mobile, tablet, and desktop devices.

## 🚀 Overview

The application serves as a social platform for cooking enthusiasts. Users can browse public recipes, filter them by various criteria, create their own recipe collections, and follow other users. The interface is built with a focus on usability, utilizing modal windows for authentication and lazy loading for performance optimization.

### Key Features
* **Authentication:** Secure registration and login flows using modal windows (handled via Redux and Formik).
* **Recipe Discovery:**
    * **Hero Section:** engaging introduction with daily featured content.
    * **Categories:** Browse recipes by specific food categories (Beef, Vegan, Desserts, etc.).
    * **Search & Filter:** Advanced filtering by ingredients and regions.
* **Recipe Management:**
    * **Add Recipe:** A multi-step form allows users to upload their own recipes with photos, ingredients, and preparation steps.
    * **Recipe Details:** Comprehensive view of recipes including ingredients lists and cooking instructions.
* **User Profiles:**
    * **My Recipes:** Manage personally created recipes.
    * **Favorites:** Quick access to saved recipes.
    * **Social:** View "Followers" and "Following" lists to connect with other chefs.
* **Responsive Design:** Adaptive layout that supports mobile (burger menu), tablet, and desktop views.

## 🛠 Tech Stack & Libraries

The project is built using **React** with **Vite** for a fast development environment. State management and routing are handled by industry-standard libraries.

**Core & State Management:**
* **React Redux / Redux Toolkit:** Manages global state (authentication, user data, recipes) and handles asynchronous operations.
* **React Router:** Handles client-side routing, utilizing `lazy` loading to split code chunks and improve initial load times.
* **Axios:** Handles HTTP requests to the backend API.

**UI & Forms:**
* **Formik & Yup:** Used for building robust forms with schema-based validation (Login, Registration, Add Recipe).
* **Modern Normalize:** Ensures consistent styling across different browsers.
* **React Slick / Slick Carousel:** Powers the testimonial and category sliders.
* **React Hot Toast:** Provides user feedback via notification popups.
* **React Datepicker:** User-friendly date selection.
* **Boring Avatars:** Generates placeholder avatars for users without profile pictures.

## 📦 Installation & Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file (refer to `.env.template` if available) to configure API endpoints.
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Build for production:
    ```bash
    npm run build
    ```