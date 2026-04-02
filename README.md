# shopYaar - E-Commerce Application

A modern, high-performance React e-commerce application built for the Sembark Frontend Assignment.

## 🔗 Repository
GitHub: [https://github.com/Niyassgit/sembark-frontend-assignment](https://github.com/Niyassgit/sembark-frontend-assignment)

## 📖 Description
shopYaar is a fully functional online store built with React 19, TypeScript, and Tailwind CSS. It features a robust product discovery system powered by the **Platzi Fake Store API**, dynamic routing, and a persistent shopping cart. The application is architected using a feature-based structure for scalability and maintainability.

### Key Features
- **Advanced Filtering**: Filter products by multiple categories, price ranges, and titles simultaneously.
- **URL-Persistent State**: Filters and sort orders are synchronized with URL search parameters, ensuring state persistence across page refreshes and navigation history.
- **Dynamic Product Discovery**: Real-time product search and math-based client-side sorting (Price: Low to High / High to Low).
- **Persistent Shopping Cart**: Global state management using React Context API with `localStorage` synchronization to maintain cart items across sessions.
- **Refactored Architecture**: Clean, modular codebase with a dedicated `FilterBox` component and feature-specific services.
- **Responsive & Premium UI**: Mobile-first design with a modern, glassmorphic aesthetic and smooth transitions.

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (installed with Node)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Niyassgit/sembark-frontend-assignment.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd sembark-frontend-assignment
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal) to view the application.

## 🛠️ Built With
- **React 19**
- **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS 4** (Styling)
- **React Router 7** (Navigation)
- **Axios** (API Requests)
- **Context API** (State Management)
- **Platzi Fake Store API** (Data Source)
