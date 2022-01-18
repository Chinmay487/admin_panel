import React, { useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

import Form from "./Form";

const ProductForm = (props) => {
  const [spinnerState, setSpinnerState] = useState(false);

  const updateSpinnerState = () => {
    setSpinnerState(!spinnerState);
  };

  return (
    <Box sx={{ mt: "10rem" }}>
      {spinnerState ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            my: "12rem",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Uploading... &nbsp;</Typography>

          <CircularProgress />
        </Box>
      ) : (
        <Form
          updateSpinnerState={updateSpinnerState}
          isUpdate={props.isUpdate}
        />
      )}
    </Box>
  );
};

export default ProductForm;
