import React from "react";
import { Typography, Rating, Grid, useTheme } from "@mui/material";

const ReviewCard = (props) => {
  const theme = useTheme();
  return (
    <Grid
      item
      md={12}
      sm={12}
      xs={12}
      sx={{
        padding: "1%",
        backgroundColor: "#EEEEEE",
        boxShadow: theme.shadows[5],
      }}
    >
      <Typography variant="h6">User name</Typography>
      <Typography variant="h5">{props.item.title}</Typography>
      <Rating value={props.item.rating} readOnly />
      <Typography>{props.item.description}</Typography>
    </Grid>
  );
};

export default ReviewCard;
