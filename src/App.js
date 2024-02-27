import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes.jsx";
// import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
};

export default App;
