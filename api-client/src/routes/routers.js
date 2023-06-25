import React from "react";
import { Route, Routes } from "react-router-dom";

import Index from "../pages/categories/index";
import Show from "../pages/categories/show";
import Create from "../pages/categories/create";
import Error404 from "../pages/errors/error404";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/create-category" element={<Create />} />
      <Route path="/category/:id" element={<Show />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default Routers;
