import React from "react";
import { Routes, Route } from "react-router-dom";
import Panel from "./seller/Panel";
import Home from "./home/Home";
import ProductForm from "./seller/ProductForm";
import DetailView from "./Product/DetailView";
import ReviewPage from "./Product/ReviewPage";
import ErrorPage from "./error/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        exact={true}
        path="/"
        element={window.localStorage.getItem("idToken") ? <Panel /> : <Home />}
      />
      {window.localStorage.getItem("idToken") ? (
        <>
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
        </>
      ) : null}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
