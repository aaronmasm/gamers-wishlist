# Gamer's Wishlist

Gamer's Wishlist is a simple web application that allows users to create a personalized wishlist for video games,
including details like game name, platform, store, price, and release date. The app includes features for adding,
editing, deleting, and searching through the list of games. All the wishlist data is stored locally in the browser
using **localStorage**, ensuring persistence across sessions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styling](#styling)
- [License](#license)

## Project Overview

Gamer's Wishlist is a web application designed to help users create and manage a personalized wishlist for video games.
The app allows users to add, edit, delete, and search for games, while storing data locally in the browser using
**localStorage** to ensure data persistence across sessions. The application features a clean and responsive design
built
with React and Tailwind CSS.

## Features

- Add new games to the wishlist with detailed information.
- Edit details of existing games.
- Remove games from the wishlist.
- Reset the entire wishlist.
- Search for games in real-time as you type.
- Persistent data storage using **localStorage**.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tool for fast builds and optimized development experience.
- **TypeScript:** Superset of JavaScript with static types.
- **React Context API:** For managing global state.
- **React `useReducer`:** For state management with complex state logic.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **react-date-picker:** For date selection in the game forms.
- **localStorage:** Browser API for persisting the wishlist data.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaronmasm/gamers-wishlist.git

2. **Navigate to the project directory:**

   ```bash
   cd gamers-wishlist

3. **Install the dependencies:**

   ```bash
   npm install

4. **Start the development server:**

   ```bash
   npm run dev

## Usage

- **Add Game:**
    - Click the "Add Game" button to open the modal. Fill out the form with the game's name, platform, store, price, and
      release date. Once submitted, the game will be added to your wishlist.

- **Edit Game:**
    - To edit an existing game, swipe right on the game item in the list. This will reveal the "Edit" action. Make the
      necessary changes in the form and submit the updates.

- **Delete Game:**
    - To remove a game from the wishlist, swipe left on the game item in the list. This will reveal the "Delete" action.
      Confirm the deletion in the prompt to remove the game from the list.

- **Search Games:**
    - Use the search bar at the top of the page to filter the list of games. The list updates in real time as you type,
      allowing you to quickly find specific games.

- **Reset List:**
    - Click the "Reset List" button to clear all games from the wishlist. This action will remove all entries and reset
      the list to its initial state.

- **Local Storage:**
    - The application uses local storage to save your wishlist data. Your games will persist even after you refresh or
      close the browser, ensuring that your wishlist is always available.

## Project Structure

The project is organized as follows:

- `src/`
    - `assets/` - Contains static assets like logos and icons.
        - `logos/`
            - `platforms-icons/` - Icons representing different gaming platforms (PC, PlayStation, Xbox, Nintendo
              Switch).
            - `stores-icons/` - Icons representing stores like Steam, Epic Games, PlayStation Store, etc.
    - `data/` - Contains predefined options for platforms and stores.
        - `options.ts` - Lists platform, store, and content type data.
    - `components/` - Contains the React components used in the application.
        - `GameItem.tsx` - Displays individual game items.
        - `GameForm.tsx` - Form for adding and editing games.
        - `GameList.tsx` - Lists all games in the wishlist.
        - `ErrorMessage.tsx` - Displays error messages.
        - `GameModal.tsx` - Modal for adding or editing games.
        - `SearchBar.tsx` - A search bar that filters the game list in real-time.
    - `hooks/` - Contains custom hooks used in the application.
        - `useGame.ts` - Custom hook for game-related operations.
    - `context/` - Contains context providers for global state management.
        - `GameContext.tsx` - Provides the game context and manages state across the app.
    - `reducer/` - Contains state management logic.
        - `game-reducer.ts` - Reducer function for managing the game-related state.
    - `types/` - TypeScript type definitions.
        - `index.ts` - Defines types for the application.
    - `App.tsx` - Main application component.
    - `main.tsx` - Entry point for the React application.
    - `index.css` - Global styles.

## Components

- **GameItem.tsx:**
    - Displays individual game details in the wishlist, including name, platform, store, price, and release date.
      Provides buttons for editing or deleting the game.

- **GameForm.tsx:**
    - A form used for adding new games or editing existing ones. It includes fields for the game name, platform, store,
      price, and release date.

- **GameList.tsx:**
    - Displays a list of all the games added to the wishlist. It retrieves the games from the global state and passes
      them to `GameItem` for rendering.

- **ErrorMessage.tsx:**
    - A reusable component for displaying error messages, typically shown when a user tries to submit invalid data in
      the form.

- **GameModal.tsx:**
    - A modal component used to add or edit game entries. It opens when the user chooses to add or edit a game and
      contains the `GameForm` inside.

- **SearchBar.tsx:**
    - A search bar that filters the displayed games based on the user's input. As the user types, the list of games
      updates in real time.

## Styling

The application uses Tailwind CSS for styling. The utility-first approach ensures a clean and responsive design,
allowing for rapid development and consistent look and feel across different devices.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

© 2024 Aarón Más Murro
