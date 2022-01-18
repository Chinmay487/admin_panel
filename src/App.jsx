import React from "react";
import { Typography ,CssBaseline } from "@mui/material";
import AppRoutes from "./AppRoutes";
import "./index.css"
const App = () => {

const textStyle1 = {

    color:"greenyellow",
    fontWeight:"bold",
    

}
    return (
        <>
        <CssBaseline/>
        <AppRoutes/>
        
        </>
    )

}

export default App