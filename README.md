# Creating Mentions And Hashtags In ReactJS

![Creating Mentions And Hashtags In ReactJS](/mentions-and-hashtags-in-reactjs.webp)

Learn how to implement # and @ in ReactJS apps quickly and easily using react-mentions npm package

## Prerequisites

- Node.js ≥v18 is installed on your machine
- Yarn (recommended) or npm is installed on your machine
- You have a basic understanding of React.js and modern JavaScript (ES6+)
- Familiarity with Vite and Tailwind CSS is helpful but not required

## We Will Be Using

- [Vite](https://vitejs.dev/) as the build tool and dev server
- [React 19](https://react.dev/) for building the UI
- [React Router v7](https://reactrouter.com/en/main) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [react-mentions](https://github.com/signavio/react-mentions) for hashtag and mention functionality
- [Axios](https://axios-http.com/) for HTTP requests
- [html-react-parser](https://github.com/remarkablemark/html-react-parser) for parsing HTML in React
- Backend API to fetch posts, users, tags, and create posts (see API link below)

### This is [Back-End API Link](https://hashtags-and-mentions-server.onrender.com/api).

Note: This project is migrated to Vite (latest as of June 2025), and below are migration notes which may help you.

## Migration Notes

- Migrated from Create React App (CRA) to [Vite](https://vitejs.dev/) for faster development
  and build.
- Upgraded to the latest React, ReactDOM, Tailwind CSS, and other dependencies.
- Tailwind CSS and PostCSS are now configured for Vite.
- Use `yarn` for dependency management.

### Issues Encountered & Solutions

- **Migrated from Create React App (CRA) to [Vite](https://vitejs.dev/):**

  - Removed all CRA-specific dependencies and scripts (e.g., `react-scripts`, `craco`, etc.).
  - Updated `package.json` scripts to use Vite (`dev`, `build`, `preview`).
  - Moved `public/index.html` to root folder.

- **JSX Syntax Not Enabled for `.js` Files:**

  - Vite only parses JSX in `.jsx` or `.tsx` files by default.
  - **Solution:** Renamed all React component files using JSX from `.js` to `.jsx` (e.g., `App.js` → `App.jsx`).
  - Updated all imports to use extensionless paths (e.g., `import App from "./App"`).

- **Entry Point and HTML:**

  - Vite expects the entry point to be `src/main.jsx` (or `main.js`).
  - **Solution:** Renamed `src/index.js` to `src/main.jsx` and updated `index.html` to use `<script type="module" src="/src/main.jsx"></script>`.
  - Removed all `%PUBLIC_URL%` references from `index.html`.

- **Environment Variables:**

  - Vite does not provide a global `process` object. Instead, it uses `import.meta.env` for environment variables.
  - **Issue:** Usage of `process.env.REACT_APP_SERVER_API` caused `Uncaught ReferenceError: process is not defined`.
  - **Solution:** Replaced with `import.meta.env.VITE_SERVER_API` and documented the need for a `.env` file with `VITE_` prefix.

- **React 19 Upgrade:**

  - Upgraded `react` and `react-dom` to v19.0.0.
  - Updated entry point to use `createRoot` from `react-dom/client` (ReactDOM.render is removed in React 19).

- **React Router Migration:**

  - Upgraded `react-router-dom` to v7.6.2 (latest as of June 2025).
  - **Issues:**
    - Old usage of `<Route>` as a direct child of `<BrowserRouter>` and use of `exact` prop (v5 style) is not supported in v6+.
    - Usage of `useHistory` hook (removed in v6+).
  - **Solutions:**
    - Wrapped all routes in `<Routes>`, used the `element` prop for `<Route>`, and removed `exact`.
    - Replaced `useHistory` with `useNavigate` in all components.

- **web-vitals Import Error:**

  - The `web-vitals` package was not installed, causing import errors.
  - **Solution:** Removed all references to `web-vitals` and `reportWebVitals.js`.

- **Other Fixes:**
  - Ensured all usage of `Link`, `useNavigate`, and other router APIs are v7 compatible.
  - Verified Tailwind CSS and PostCSS are configured for Vite.

---

## Getting Started

1. **Install dependencies:**
   ```sh
   yarn install
   ```
2. **Start the development server:**
   ```sh
   yarn dev
   ```
3. **Build for production:**
   ```sh
   yarn build
   ```
4. **Preview production build:**
   ```sh
   yarn preview
   ```

## Project Structure

- `vite.config.js`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `src/`: Source code

---

For more details, see the [Vite documentation](https://vitejs.dev/guide/), [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [React Router v7 docs](https://reactrouter.com/en/main), and [Tailwind CSS documentation](https://tailwindcss.com/docs/installation`).
