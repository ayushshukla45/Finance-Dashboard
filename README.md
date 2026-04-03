# High-Fidelity Finance Dashboard (FinDash)

**Developer**: Ayush Shukla

## 🎯 Project Overview
FinDash is a professional-grade, interactive financial management dashboard designed for high-end data visualization and secure user management. Built with a focus on performance, accessibility, and visual excellence, this project showcases modern React patterns and robust Role-Based Access Control (RBAC).

## ✨ Key Features
- **Strict Role-Based Access Control (RBAC)**: Implementation of `Admin` and `Viewer` roles. Admins have full CRUD access, while Viewers can only interact with data in read-only mode, with restricted UI elements completely unmounted from the DOM.
- **Dynamic Insights & Analytics**: Real-time savings rate calculation, expense tracking, and trend forecasting.
- **Responsive Data Visualization**: Interactive charts powered by **Recharts**, including an Area Trend chart for balance monitoring and a Donut Chart for spending distribution.
- **Enterprise-Grade UI/UX**:
  - Glassmorphic panels with backdrop filters.
  - Custom dark/light mode with sleek transitions.
  - Symmetrical sidebar navigation with improved alignment.
  - Simulated network latency with skeleton loaders for a realistic production feel.
- **Mobile-Responsive Design**: A fluid layout that transitions from a complex desktop grid to a mobile-optimized side-drawer navigation.

## 🛠️ Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS (Custom Glassmorphic design)
- **Icons**: Lucide-React
- **Charts**: Recharts (Optimized for zero-layout shifts)
- **State Management**: Context API + `useReducer` for robust global orchestration

## 🧠 Technical Approach

### 1. Global State Management
Instead of simple `useState` prop-drilling, the application uses a **Context API + `useReducer`** pattern. This ensures that the financial ledger, user roles, and even the active tab are synchronized across the entire application. State values are automatically persisted in `localStorage`, maintaining a consistent user experience during page refreshes.

### 2. Physical RBAC (Role-Based Access Control)
The project implements "Physical RBAC," where restricted elements (e.g., the "Inject Data" button or "Edit/Delete" actions) are not just hidden with CSS but are **completely unmounted from the DOM** when the user is in `Viewer` mode. This is achieved through strict conditional rendering using the global `role` state.

### 3. Responsive Data Visualization
A significant technical challenge was silencing Recharts warnings on mobile. This was resolved by implementing an `isMounted` state check and utilizing `fixed-aspect-ratio` wrappers alongside a `debounce={100}` on window resizing to ensure smooth rendering on high-DPI phone screens.

## 🚀 Getting Started

Ensure you have [Node.js](https://nodejs.org/) installed on your local machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [your-repo-link]
   ```
2. Navigate to the project directory:
   ```bash
   cd Finance-Dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

### Production Build
To create a production-ready bundle:
```bash
npm run build
```

---
*Developed by Ayush Shukla for the Professional Frontend Internship evaluation.*
