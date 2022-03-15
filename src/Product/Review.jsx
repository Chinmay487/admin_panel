import React from "react";
import { Box, Typography, Rating } from "@mui/material";

const Review = () => {
  return (
    <Box component="div" sx={{ padding: "2%" }}>
      <Typography variant="subtitle2">username</Typography>
      <Rating name="read-only" value={4} />
      <Typography variant="h6">Title</Typography>
      <Typography variant="p">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio iure
        dolorum, necessitatibus asperiores magnam praesentium debitis ea qui.
        Similique, eveniet?
      </Typography>
    </Box>
  );
};

export default Review;
