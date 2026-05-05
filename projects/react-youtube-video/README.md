# React YouTube Video Gallery

A beautiful, responsive React application that fetches and displays trending YouTube videos with a clean, modern UI. Built with React, Vite, and Tailwind CSS.

## Features

- ✨ **Responsive Grid Layout** — Videos displayed in a responsive grid that adapts to different screen sizes
- 🎬 **Video Cards** — Each card showcases:
  - Video thumbnail
  - Title
  - Channel name
  - View count (formatted)
  - Publication date
- 🔄 **Live Data Fetching** — Powered by the free YouTube API from [freeapi.app](https://api.freeapi.app/)
- ⚡ **Fast & Modern** — Built with Vite for lightning-fast development and build times
- 🎨 **Styled with Tailwind CSS** — Beautiful, utility-first CSS for polished design
- 📱 **Mobile Optimized** — Fully responsive from mobile to desktop screens
- 🎯 **Error Handling** — Graceful error handling and loading states

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Source:** FreeAPI YouTube Videos API
- **Package Manager:** pnpm

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── App.jsx          # Main app component with video fetching logic
├── main.jsx         # Entry point
├── index.css        # Global styles
└── assets/          # Static assets
```

## How It Works

1. The app fetches video data from the free YouTube API on component mount
2. Videos are displayed in a responsive grid layout
3. Each video card shows key information in a beautifully styled format
4. Hover effects provide interactive visual feedback
5. Error states and loading indicators enhance user experience

## Development

The app uses Vite for hot module replacement (HMR) during development. Simply run `pnpm dev` and edit files to see changes reflected instantly.

## API Reference

This project uses the FreeAPI public YouTube videos endpoint:
```
https://api.freeapi.app/api/v1/public/youtube/videos
```

No authentication required for public data access.
