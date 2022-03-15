import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import QueryDetail from "./QueryDetail";

const QueryInfo = (props) => {
  const [querydetailOpen, setQueryDetailOpen] = useState(false);

  const changeQueryDetailstatus = () => {
    setQueryDetailOpen(!querydetailOpen);
  };

  return (
    <>
      <Box sx={{
          padding:"0.5rem"
      }}>
        <Typography> Payment Date : {props.item.payment_date} </Typography>
        <Typography> Total : &#x20B9;{props.item.total} </Typography>
        <Typography> City :  {props.item.address.city} </Typography>
        <Button onClick={changeQueryDetailstatus}>View</Button>
        <QueryDetail
          changeQueryDetailstatus={changeQueryDetailstatus}
          querydetailOpen={querydetailOpen}
          item = {props.item}
        />
        {/* <Typography> {props.item.uid} </Typography> */}
      </Box>
    </>
  );
};

export default QueryInfo;
