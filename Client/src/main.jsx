import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Ensure correct import
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

// import "./index.css"; // Global styles
import App from "./App.jsx"; // Main App component

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router> {/* ✅ This should be the ONLY Router in your app */}
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>
);
