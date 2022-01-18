import React from "react";
import { Routes, Route } from "react-router-dom";
import Panel from "./seller/Panel";
import ProductForm from "./seller/ProductForm";
import DetailView from "./Product/DetailView";
import ReviewPage from "./Product/ReviewPage";

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

      <Route exact={true} path="/detail/:key" element={<DetailView />} />

      <Route exact={true} path="/review/:key" element={<ReviewPage />} />
    </Routes>
  );
};

export default AppRoutes;
