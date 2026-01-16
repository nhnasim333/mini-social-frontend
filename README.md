# Mini Social Frontend - CommentsHub

A modern, feature-rich social commenting application built with React and Vite. This application provides a comprehensive commenting system with nested replies, real-time interactions, and a beautiful user interface.

## Features

### Core Functionality

- **User Authentication** - Secure registration and login with JWT tokens
- **Comment Management** - Create, read, update, and delete comments
- **Nested Replies** - Support for threaded conversations with replies to comments
- **Like/Dislike System** - Interactive engagement on comments
- **Real-time Statistics** - Track comment counts, likes, and engagement metrics
- **Pagination & Sorting** - Browse comments with customizable sorting (newest, oldest, most liked)
- **User Profiles** - Avatar displays and user information
- **Protected Routes** - Secure access control for authenticated users

### Technical Features

- **Modern UI/UX** - Beautiful gradient backgrounds with animated blob effects
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Component Library** - shadcn/ui components (Avatar, Alert Dialog, Dropdown Menu, Cards, etc.)
- **State Management** - Redux Toolkit with RTK Query for efficient data fetching
- **State Persistence** - Redux Persist for maintaining user sessions
- **Form Handling** - React Hook Form for efficient form management
- **Toast Notifications** - Sonner for beautiful user feedback
- **Token Management** - JWT decoding and verification
- **API Integration** - RESTful API with RTK Query

## Tech Stack

### Frontend Framework

- **React 18.3.1** - Latest React with hooks and concurrent features
- **Vite 6.0.5** - Lightning-fast build tool and dev server

### Styling

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful and consistent icon library
- **Class Variance Authority** - For component variants

### State Management

- **Redux Toolkit 2.2.1** - Modern Redux with simplified setup
- **React Redux 9.1.0** - Official React bindings for Redux
- **Redux Persist 6.0.0** - Persist and rehydrate Redux store
- **RTK Query** - Powerful data fetching and caching

### Routing & Forms

- **React Router DOM 6.22.0** - Declarative routing for React
- **React Hook Form 7.71.1** - Performant form validation

### Utilities

- **jwt-decode 4.0.0** - Decode JWT tokens
- **sonner 2.0.7** - Toast notification system
- **clsx & tailwind-merge** - Utility for managing class names

### Development Tools

- **ESLint 9.17.0** - Code linting and quality
- **PostCSS & Autoprefixer** - CSS processing
- **Vite Plugin React** - Fast refresh and JSX support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running (for full functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/nhnasim333/mini-social-frontend

# Navigate to project directory
cd mini-social-frontend

# Install dependencies (if not already installed)
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

Preview the production build locally:

```bash
npm run preview
```

## Live Link

The frontend is deployed and can be accessed at: [https://mini-social-sepia.vercel.app](https://mini-social-sepia.vercel.app)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## API Endpoints

The application connects to a backend API with the following endpoints:

### Authentication

- `POST /users/create` - Register new user
- `POST /users/login` - Login user

### Comments

- `GET /comments` - Get all comments (with pagination & sorting)
- `POST /comments` - Create new comment
- `GET /comments/:id` - Get single comment
- `PATCH /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment
- `POST /comments/:id/like` - Like a comment
- `POST /comments/:id/dislike` - Dislike a comment
- `GET /comments/:id/replies` - Get comment replies
- `GET /comments/statistics` - Get comment statistics

## UI Components

The app uses shadcn/ui components including:

- Alert Dialog - For confirmations
- Avatar - User profile pictures
- Button - Interactive buttons
- Card - Content containers
- Dropdown Menu - Context menus
- Input & Textarea - Form inputs
- Label - Form labels

## Authentication

- JWT-based authentication
- Token stored in Redux with persistence
- Protected routes for authenticated users only
- Automatic token verification and decoding
