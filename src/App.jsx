import React from "react";
import { Typography ,CssBaseline } from "@mui/material";
const App = () => {

const textStyle1 = {

    color:"greenyellow",
    fontWeight:"bold",
    

}
    return (
        <>
        <CssBaseline/>
        <Typography variant="h1" sx={textStyle1}>Hello world</Typography>
        </>
    )

}

export default App