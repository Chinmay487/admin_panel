import React from "react";
import { Routes, Route } from "react-router-dom";
import Panel from "./seller/Panel";
import ProductForm from "./seller/ProductForm";


const AppRoutes = () => {
  return (
    <Routes>
      <Route
        exact={true}
        path="/panel"
        element={<Panel isSeller={props.isSeller} />}
      />

      <Route
        exact={true}
        path="/update/:key"
        element={<ProductForm isUpdate={true} />}
      />

      <Route
        exact={true}
        path="/addproduct"
        element={<ProductForm isUpdate={false} />}
      />
    </Routes>
  );
};

export default AppRoutes;
