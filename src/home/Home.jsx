import React, { useState } from "react";
import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
import {loginUser} from '../authentication/auth'

const Home = () => {
  const theme = useTheme();
  const [adminFormData, setAdminFormData] = useState({
    email: "",
    password: "",
  });

  const onLoginInputChange = (event) => {
    const { name, value } = event.target;
    setAdminFormData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    alert("hahahahaha");
    loginUser(adminFormData.email,adminFormData.password)
    // window.location.reload();
  };

  return (
    <Box
      component="form"
      sx={{
        width: {
          md: "20%",
          sm: "80%",
          xs: "80%",
        },
        height: "20rem",
        my: "5rem",
        mx: "auto",
        border: "1px solid #EEEEEE",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "center",
        padding: "1%",
        backgroundColor: "#EEEEEE",
        boxShadow: theme.shadows[5],
      }}
      onSubmit={onLoginFormSubmit}
    >
      <Typography variant="h6">Welcome</Typography>
      <Typography variant="h6">Login Here</Typography>
      <TextField
        label="email"
        type="email"
        variant="standard"
        sx={{ width: "80%", mx: "auto" }}
        name="email"
        value={adminFormData.email}
        onChange={onLoginInputChange}
        required={true}
      />
      <TextField
        label="password"
        type="password"
        variant="standard"
        sx={{ width: "80%", mx: "auto" }}
        name="password"
        value={adminFormData.password}
        onChange={onLoginInputChange}
        required={true}
      />
      <Button
        variant="outlined"
        sx={{
          width: "50%",
          mx: "auto",
        }}
        type="submit"
      >
        Login
      </Button>
    </Box>
  );
};

export default Home;