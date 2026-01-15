# Mini Social Frontend

A modern React application built with Vite, featuring Tailwind CSS, shadcn/ui, Redux Toolkit, and React Router.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Latest React with hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible component library
- 🔄 **Redux Toolkit** - State management made easy
- 🧭 **React Router DOM** - Client-side routing
- 📝 **JavaScript** - Using modern ES6+ syntax

## Project Structure

```
mini-social-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── store/           # Redux store and slices
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── components.json      # shadcn/ui configuration
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Using shadcn/ui Components

To add shadcn/ui components to your project:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

This will add the component to `src/components/ui/`

## Redux Toolkit

The project includes a basic Redux setup with a counter example in `src/store/`:

- `store.js` - Configure the Redux store
- `counterSlice.js` - Example slice with actions and reducers

To create a new slice:

1. Create a new file in `src/store/`
2. Define your slice using `createSlice`
3. Export actions and reducer
4. Add the reducer to the store

## React Router

Routes are configured in `App.jsx`. Current routes:

- `/` - Home page
- `/about` - About page

To add new routes, import your page component and add a new `<Route>` element.

## Tailwind CSS

Tailwind is configured with shadcn/ui's design system. Custom theme variables are defined in `src/index.css`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

ISC
