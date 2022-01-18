import React from "react";
import { Typography ,CssBaseline } from "@mui/material";
import AppRoutes from "./AppRoutes";
import "./index.css"
import Navbar from "./Navbar/Navbar";
const App = () => {

const textStyle1 = {

    color:"greenyellow",
    fontWeight:"bold",
    

}
    return (
        <>
        <CssBaseline/>
        <Navbar/>
        <AppRoutes/>
        
        </>
    )

}

export default App