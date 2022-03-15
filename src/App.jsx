import React from "react";
import {CssBaseline } from "@mui/material";
import AppRoutes from "./AppRoutes";
import "./index.css"
import Navbar from "./Navbar/Navbar";
import {setCurrentAuthState} from "./authentication/auth"


const App = () => {

    if(window.localStorage.getItem("idToken")){
        setCurrentAuthState()
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