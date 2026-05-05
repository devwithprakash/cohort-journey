# 🎭 HaHa - Random Jokes Viewer

A lightweight and fun React application that fetches and displays random jokes. Built with modern web technologies for a smooth user experience.

## Features

- 🎲 **Random Joke Generator** - Fetches a new random joke with each request
- 💨 **Fast & Responsive** - Built with Vite for instant HMR and rapid development
- 🎨 **Beautiful UI** - Styled with Tailwind CSS for a modern, clean interface
- ⚡ **Lightning-fast** - Optimized performance with React 19 and Vite
- 📱 **Mobile Friendly** - Fully responsive design for all screen sizes
- 🔄 **Loading States** - Visual feedback while fetching jokes

## Tech Stack

- **React** 19.x - UI library
- **Vite** 8.x - Build tool and dev server
- **Tailwind CSS** 4.x - Utility-first CSS framework
- **Free Jokes API** - Random joke data source

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   pnpm install
   ```

## Getting Started

### Development Server

Start the development server with hot module replacement (HMR):

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Create an optimized production build:

```bash
pnpm build
```

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```
src/
├── App.jsx           # Main application component
├── main.jsx          # React application entry point
├── index.css         # Global styles
└── assets/           # Static assets
```

## How It Works

1. The app initializes by automatically fetching a random joke on mount
2. Click the "Get Another Joke" button to fetch a new joke
3. The app displays a loading state while fetching data
4. Jokes are displayed in a card format in the center of the screen

## API

This project uses the [Free API - Random Jokes](https://freeapi.app) endpoint:

```
GET https://api.freeapi.app/api/v1/public/randomjokes/joke/random
```
