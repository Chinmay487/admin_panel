import React, { useState } from "react";
import { Box, Typography, Button,useTheme } from "@mui/material";

import QueryDetail from "./QueryDetail";

const QueryInfo = (props) => {

  const theme = useTheme();

  const [querydetailOpen, setQueryDetailOpen] = useState(false);

  const changeQueryDetailstatus = () => {
    setQueryDetailOpen(!querydetailOpen);
  };

  return (
    <>
      <Box  sx={{
            width: {
              lg: "50%",
              md: "50%",
              sm: "100%",
              xs: "100%",
            },
            border: "1px solid #CFD8DC",
            boxShadow: theme.shadows[5],
            margin: "0.5rem auto",
            padding:"0.5rem"
          }}>
        <Typography> Payment Date : {props.item.payment_date} </Typography>
        {
          props.status == "dispatched"? <Typography>Delivery Date : {props.item.delivery_date}</Typography> : null
        }
        <Typography> Total : &#x20B9;{props.item.total} </Typography>
        <Typography> City :  {props.item.shipping_address.city} </Typography>
        <Button onClick={changeQueryDetailstatus}>View</Button>
        <QueryDetail
          changeQueryDetailstatus={changeQueryDetailstatus}
          querydetailOpen={querydetailOpen}
          item = {props.item}
          fetchData={props.fetchData}
        />
      </Box>
    </>
  );
};

export default QueryInfo;
