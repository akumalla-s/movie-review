# MovieMinds

Welcome to MovieMinds! This is a React web application for movie enthusiasts where users can explore, review, and engage with movies. Below you'll find information about the project structure, key components, and how to get started with the application.

## Project Structure

The project structure is organized as follows:

- **components**: Contains React components for different parts of the application such as NavBar, Body, Login, Logout, About, Footer, RegistrationForm, RegistrationSuccess, MovieReview, AddMovieData, UpdateMovieData, DisplayMovies, DisplayMovie, and AddNewMovie.
- **css**: Includes CSS files for styling components such as App.css, About.css, AddMovieData.css, DisplayMovie.css, and AddNewMovie.css.
- **services**: Contains helper functions and services such as HelperService, GetToken, and URL for managing authentication, API requests, and other utility functions.
- **store**: Includes Redux related files such as authReducer for managing user authentication state.

## Key Components

- **NavBar**: Provides navigation links and a search bar for users to navigate through the application and search for movies.
- **Body**: Displays the main content of the application including movie listings and options to add new movies (for admins).
- **Login**: Allows users to log in to their accounts.
- **Logout**: Allows users to log out of their accounts.
- **About**: Provides information about MovieMinds and its mission.
- **RegistrationForm**: Allows users to register for a new account.
- **RegistrationSuccess**: Displays a success message after successful registration.
- **MovieReview**: Allows users to view details about a specific movie, add reviews, and delete or edit their own reviews (admins can delete any review).
- **AddMovieData**: Allows admins to add new movie data including name, release year, and photo.
- **UpdateMovieData**: Allows admins to update existing movie data.
- **DisplayMovies**: Displays a list of movies with pagination and search functionality.
- **DisplayMovie**: Displays detailed information about a single movie.
- **AddNewMovie**: Provides a button for admins to easily add new movies.

## Getting Started

To get started with MovieMinds:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.
4. Open your browser and navigate to `http://localhost:3000` to view the application.
