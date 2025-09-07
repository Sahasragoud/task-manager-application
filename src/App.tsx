import React from "react";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppRoutes />
    </div>
  );
};

export default App;
