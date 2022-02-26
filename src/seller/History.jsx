import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NETWORK_URL } from "../links";

const History = (props) => {
  const theme = useTheme();

  const [deleteButtonState, setDeleteButtonState] = useState(false);

  const profileGridItem = {
    display: "flex",
    flexDirection: "column",
    justifyContent: {
      lg: "space-evenly",
      md: "space-evenly",
      sm: "center",
      xs: "center",
    },
    py: {
      lg: "0%",
      md: "0%",
      sm: "3%",
      xs: "3%",
    },
  };

  const profileGridItemText = {
    mx: {
      lg: "0%",
      md: "0%",
      sm: "5%",
      xs: "5%",
    },
  };

  // const quantity = {
  //   px: {
  //     lg: "0",
  //     md: "0",
  //     sm: "5%",
  //     xs: "5%",
  //   },
  //   py: "2%",
  //   width: "100%",
  //   display: "flex",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // };

  const cartButtons = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: {
      lg: `${props.isSeller ? "column" : null}`,
      md: `${props.isSeller ? "column" : null}`,
      sm: "column",
      xs: "column",
    },
    justifyContent: `${props.isSeller ? "space-evenly" : "center"}`,
    mx: "1%",
  };

  const navigate = useNavigate();

  const gotoUpdate = () => {
    navigate(`/update/${props.item.key}`);
  };

  const deleteProduct = () => {
    setDeleteButtonState(true);
    const data = new FormData();
    data.append("id", props.item.key);
    data.append("category",props.category)
    axios
      .post(`${NETWORK_URL}/seller/deleteproduct`, data)
      .then((response) => {
        setDeleteButtonState(false);
        props.fetchData(0)
      })
      .catch((error) => {
        alert("Something went wrong");
        props.fetchData(0)
      });
  };

  return (
    <Grid item sm={12} xs={12}>
      <Grid
        container
        sx={{ boxShadow: theme.shadows[5], backgroundColor: "#F5F5F5" }}
      >
        <Grid item md={3} sm={12} xs={12}>
          <Box component="center">
            <Box
              component="img"
              src={props.item.thumbnail}
              sx={{
                maxWidth: { lg: "80%", md: "80%", sm: "80%", xs: "80%" },
                height: "10rem",
              }}
            />
          </Box>
        </Grid>
        <Grid item md={7} sm={12} xs={12} sx={profileGridItem}>
          <Link to={`/detail/${props.category}/${props.item.key}`} className="link">
            <Typography sx={profileGridItemText} variant="h6">
              {props.item.title}
            </Typography>
          </Link>
          <Typography sx={profileGridItemText} variant="h6">
            {" "}
            Price : {props.item.price}{" "}
          </Typography>
    
            <Typography sx={profileGridItemText} variant="h6">
              {" "}
              Qty : {props.item.quantity}{" "}
            </Typography>
          
        </Grid>
        <Grid item md={2} sm={12} xs={12} sx={profileGridItem}>
          
          <Box sx={cartButtons}>
            {deleteButtonState ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: "1rem",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="text"
                onClick={deleteProduct}
                color="error"
                sx={{
                 
                  width: "100%",
                  height: "auto",
                }}
                
              >
                <DeleteForeverIcon sx={{ color: "red" }} />
              </Button>
            )}
              <Button
                variant="outlined"
                onClick={gotoUpdate}
                sx={{
                  width: { lg: "50%", md: "50%", sm: "60%", xs: "60%" },
                  mx: "auto",
                }}
              >
                Update
              </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default History;
