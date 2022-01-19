import React from "react";
import {CssBaseline } from "@mui/material";
import AppRoutes from "./AppRoutes";
import "./index.css"
import Navbar from "./Navbar/Navbar";
const App = () => {
    return (
        <>
        <CssBaseline/>
        <Navbar/>
        <AppRoutes/>
        </>
    )

}

export default App