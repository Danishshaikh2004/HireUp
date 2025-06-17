// src/App.jsx
import React from "react";
import AppRouter from "./routes/AppRouter"; // Import AppRouter

const App = () => {
  return (
    <div>
      <AppRouter /> {/* Include the router */}
    </div>
  );
};

export default App;
