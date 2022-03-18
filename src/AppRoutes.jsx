import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import ProductForm from "./seller/ProductForm";
import DetailView from "./Product/DetailView";
import ReviewPage from "./Product/ReviewPage";
import ErrorPage from "./error/ErrorPage";
import Queries from './queries/Queries'

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      {window.localStorage.getItem("idToken") ? (
        <>
          <Route
            exact={true}
            path="/update/:category/:key"
            element={<ProductForm isUpdate={true} />}
          />

          <Route
            exact={true}
            path="/addproduct"
            element={<ProductForm isUpdate={false} />}
          />

          <Route
            exact={true}
            path="/queries"
            element={<Queries />}
          />

          <Route
            exact={true}
            path="/detail/:category/:key"
            element={<DetailView />}
          />

          <Route
            exact={true}
            path="/review/:category/:key"
            element={<ReviewPage />}
          />
        </>
      ) : null}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
