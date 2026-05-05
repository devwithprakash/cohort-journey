# Quote<span className="text-orange-500">ly</span> - Random Quotes App

A beautiful and minimalist React application that displays random inspirational quotes with smooth animations. Built with Vite for fast development and optimized performance.

## Features

- **Random Quotes**: Fetches random quotes from a public API
- **Smooth Animations**: Fade-in and slide-up transitions for quote changes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, dark theme with orange accents
- **Fast Loading**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **FreeAPI** - Public quotes API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-quotes-listing
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

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Component styles
├── index.css        # Global styles
└── main.jsx         # Application entry point

public/              # Static assets
vite.config.js       # Vite configuration
package.json         # Project dependencies
```

## API

This app uses the [FreeAPI Quotes API](https://api.freeapi.app/api/v1/public/quotes/quote/random) to fetch random quotes.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
