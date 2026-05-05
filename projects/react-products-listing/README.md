# Shopcart - React Product Listing

A modern, responsive e-commerce product listing application built with React 19 and Vite. Features a clean dark theme UI with product cards, pagination, and search functionality.

## Features

- **Product Grid Display**: Responsive grid layout showcasing products with images, titles, descriptions, prices, and discounts
- **Pagination**: Navigate through product pages with simple controls
- **Search Bar**: Placeholder for search functionality (UI ready)
- **Shopping Cart**: Cart icon in header (UI ready for integration)
- **Loading States**: Skeleton loaders for better user experience during data fetching
- **Dark Theme**: Modern dark UI using Tailwind CSS
- **Mobile Responsive**: Optimized for mobile and desktop viewing

## Tech Stack

- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework for styling
- **ESLint** - Code linting and formatting

## API

This app fetches product data from the [FreeAPI](https://api.freeapi.app/api/v1/public/randomproducts) service.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-product-listing
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

### Linting

```bash
pnpm lint
# or
npm run lint
```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
├── index.css        # Global styles and Tailwind imports
└── assets/          # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `pnpm lint`
5. Test your changes
6. Submit a pull request
