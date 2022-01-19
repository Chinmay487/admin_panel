import React, { useState } from "react";
import {
    Typography,
    AppBar,
    Box,
    useTheme,
    Toolbar,
    Button,
    useMediaQuery,
    Grid,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NavDrawer from "./NavDrawer";

const Navbar = () => {
    const theme = useTheme();

    const [burgerStatus, setBurgerStatus] = useState(false)

    const onBurgerClick = () => {
        setBurgerStatus((oldStatus) => {
            return !oldStatus
        })
    }

    const handleDrawerOpen = () => {
        setBurgerStatus(true)
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                        md: "row",
                        sm: "row",
                        xs: "column",
                    },
                    boxShadow: theme.shadows[5],
                    alignItems: "center",
                    //   height: "3rem",
                    alignItems: "center"
                    //   padding:"5px",
                }}
            >
                <Box
                    sx={{
                        display: {
                            xs: "flex",
                        },
                        justifyContent: {
                            xs: "space-between",
                        },
                        width: {
                            md: "auto",
                            sm: "auto",
                            xs: "100%",
                        },
                        alignItems: "center",
                    }}
                >
                    <NavLink to="/" className="link">
                        <Typography
                            sx={{
                                color: "#546E7A",
                                mx: "1rem",
                            }}
                            variant="h5"
                        >
                            ShopHeaven
                        </Typography>
                    </NavLink>
                    <Button
                        variant="text"
                        sx={{
                            cursor: "pointer",
                            display: {
                                lg: "none",
                                md: "none",
                                sm: "none",
                                xs: "block",
                            },
                            mx: "1rem",
                            fontSize: "1.5rem",
                        }}
                        onClick={onBurgerClick}
                    >
                        {!burgerStatus ? <MenuIcon /> : <CloseIcon />}
                    </Button>
                </Box>
                <Box
                    component="ul"
                    sx={{
                        listStyle: "none",
                        display: {
                            md: "flex",
                            sm: "flex",
                            xs: "none",
                        },
                        margin: "auto 1rem",
                        alignItems: "center",
                        // border: "1px solid green",
                    }}
                >
                    <Box component="li" sx={{ marginLeft: "1rem" }}>
                        <NavLink to="/" className="link">
                            <Typography sx={{ color: "#546E7A" }}>Panel</Typography>
                        </NavLink>
                    </Box>
                    <Box component="li" sx={{ marginLeft: "1rem" }}>
                        <NavLink to="/queries" className="link">
                            <Typography sx={{ color: "#546E7A" }}>Queries</Typography>
                        </NavLink>
                    </Box>
                    <Box component="li" sx={{ marginLeft: "1rem" }}>
                        <NavLink to="/addproduct" className="link">
                            <Typography sx={{ color: "#546E7A" }}>New Product</Typography>
                        </NavLink>
                    </Box>
                    <Box component="li" sx={{ marginLeft: "1rem" }}>
                        <Button variant="contained">Logout</Button>
                    </Box>
                </Box>
            </Box>
            <NavDrawer
                burgerStatus={burgerStatus}
                setBurgerStatus={setBurgerStatus}
                handleDrawerOpen={handleDrawerOpen}
            />
        </>
    );
};

export default Navbar;