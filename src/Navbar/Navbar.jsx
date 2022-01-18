import React from "react";
import {Typography,AppBar,Box,useTheme,Toolbar,Button} from "@mui/material";
import {NavLink} from "react-router-dom"



const Navbar = () => {

    return (
        <>
      <AppBar position="fixed" sx={{backgroundColor:"#ECEFF1"}}>

      <Toolbar sx={{display:"flex",width:"100%"}} >
          <Box>
          <NavLink to="/" className="link">
        <Typography sx={{color:"#546E7A"}} variant="h5">
            ShopHeaven
        </Typography>
        </NavLink>
        <Box sx={{display:"flex",color:"#546E7A"}}>
            <Typography>
                Queries
            </Typography>
            <Typography>
                New Product
            </Typography>
            <Button variant="contained" >Logout</Button>
        </Box>
          </Box>
        

       
      </Toolbar>
      </AppBar>
        </>
    )

}

export default Navbar;