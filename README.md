# High-Fidelity Finance Dashboard (FinDash)

**Developer**: Ayush Shukla

## 🎯 Objective
This project was developed to exceed the requirements of a Professional Frontend Internship evaluation. The goal was to construct a highly interactive, responsive, and secure financial dashboard. It demonstrates proficiency in modern React architecture, complex state management, and the ability to build sophisticated data visualizations while maintaining strict Role-Based Access Control (RBAC) on the client side.

## 🛠️ Technical Stack
- **Framework**: React 19 + TypeScript (via Vite)
- **Styling**: Tailwind CSS for rapid, utility-first responsive layouts and custom glassmorphic panels
- **Data Visualization**: Recharts (D3 mappings for Area Trends and Pie Distributions)
- **Iconography**: Lucide-React for clean, scalable, and performant SVG injection
- **State Management**: React Context API & `useReducer`

## 🏗️ Core Architecture
- **Data Encapsulation (Custom Hooks)**: Deep filtering and array-matching algorithms were completely extracted from the UI View layer into a dedicated `useTransactions` hook. This enforces strict separation of concerns and makes the component tree stateless and infinitely reusable.
- **Global RBAC via Context API**: The active user role (`Admin` vs `Viewer`) is managed centrally via the `FinanceContext`. Instead of volatile prop-drilling, deep components universally subscribe to the Context to instantly update their layout based on real-time clearance elevation.
- **Aggressive Memoization (`useMemo`)**: Complex financial calculations (like the Savings Rate, Monthly Forecasts, and distinct Category aggregation for Recharts) are wrapped tightly in `useMemo`. This prevents potentially massive math loops from crashing the browser during standard React re-renders.

## ✨ Key Features
- **Strict Role-Based Access Control**: Admins are granted full CRUD directives, while standard Viewers have their "Inject Data" buttons and "Edit/Delete" modification rows completely unmounted from the DOM—preventing any client-side manipulation attempts.
- **Dynamic Data Visualization**: Integrated an intricate `ChartSection` that maps incoming arrays onto a reactive Balance Trend area chart, complemented by a modular Spending Distribution donut chart. 
- **Responsive Navigation**: Engineered a highly fluid viewport layout that seamlessly translates a sprawling desktop CSS Grid into a focused, off-canvas sliding hamburger navigation drawer for mobile (`< 768px`) environments.
- **Enterprise Loading States**: Tab routing triggers a simulated 400ms network-latency buffer, rendering animated CSS Skeleton Loaders to replicate a realistic production-grade data fetching experience.

## ⚡ Challenges Overcome

### 1. Responsive Recharts Sizing
Getting heavy, absolute-positioned SVG charts to reliably scale backwards onto mobile viewports without overflowing parent containers is a notorious frontend issue. I tackled this by wrapping `<AreaChart>` and `<PieChart>` inside native `<ResponsiveContainer>` blocks, deliberately constraining them to `99% width` and `85% height`, and utilizing strict Flex/Grid minimum bounds to prevent DOM layout thrashing during browser resizes.

### 2. Synchronized RBAC Across Multiple UI Layers
Managing active permissions flawlessly across nested sidebars, headers, forms, and data tables often breaks application synchronization. This was permanently resolved by coupling the application's entire access level to a central Context Reducer. Since components like `<TransactionTable>` directly consume `{ role }` out of the global state, switching clearance in the `<SettingsTab>` instantly triggers a global synchronous re-render across the entire React application tree without passing a single prop manually.

## 📦 Setup Instructions

Ensure you have Node.js installed on your machine, then execute the following terminal commands to boot the application locally:

```bash
# Clone the repository and install all dependencies
npm install

# Initialize the Vite development server
npm run dev
