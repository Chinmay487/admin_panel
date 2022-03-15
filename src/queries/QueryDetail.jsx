import React, { useState } from "react";
import { Box, Typography, Dialog, Button } from "@mui/material";
import axios from 'axios';
import { NETWORK_URL } from "../links";

const QueryDetail = (props) => {
  const [deliveryDate, setDelivaryDate] = useState("");

    const onConfirmDispatch = () => {
      if(deliveryDate !== ""){
        axios.post(`${NETWORK_URL}/seller/dispatch`,{
            idToken : window.localStorage.getItem("idToken"),
            uid : props.item.uid,
            delivery_date : deliveryDate,
            address : props.item.address,
            products : props.item.products
        })
        .then((response)=>{
            console.log(response.data)
            props.changeQueryDetailstatus()
        })
        .catch((error)=>{
             console.log("something went wrong");
        })
      }
    }

  const onDateChange = (event) => {
    const {value } = event.target;
    setDelivaryDate(value);
  };
  console.log(deliveryDate);
  return (
    <>
      <Dialog fullWidth open={props.querydetailOpen}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: "1rem",
          }}
        >
          <Typography>Details </Typography>
          <Button onClick={props.changeQueryDetailstatus}> x </Button>
        </Box>
        <Box>
          <Box
            sx={{
              width: "80%",
              mx: "auto",
            }}
          >
            {props.item.products.map((product, index) => {
              return (
                <Typography key={`seller${product}${index}`}>
                  {product}
                </Typography>
              );
            })}
            <Typography>Price : &#x20B9;{props.item.total}</Typography>
            <Typography>Payment Date : {props.item.payment_date}</Typography>
          </Box>
          <Box
            component="fieldset"
            sx={{
              width: {
                lg: "50%",
                md: "50%",
                sm: "90%",
                xs: "90%",
              },
              mx: "auto",
              my: "0.5rem",
            }}
          >
            <Box component="legend">
              <Typography>Address</Typography>
            </Box>
            <Typography>
              {" "}
              Address Line 1 : {props.item.address.line1}{" "}
            </Typography>
            <Typography>
              {" "}
              Address Line 2 : {props.item.address.line2}{" "}
            </Typography>
            <Typography> City : {props.item.address.city} </Typography>
            <Typography> District : {props.item.address.district} </Typography>
            <Typography> State : {props.item.address.state} </Typography>
            <Typography> Pincode : {props.item.address.pin} </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "80%",
            mx: "auto",
            my: "0.5rem",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection:"column",
            alignItems:"center"
          }}
        >
            <Box sx={{
              width:"90%",
              mx:"auto",
              my:"0.4rem",
              display:"flex",
              justifyContent:"center"
          }}>
            <Box
              component="input"
              type="date"
              name="deliveryDate"
              id="deliveryDate"
              onChange={onDateChange}
            />
            <Button onClick={onConfirmDispatch} >Confirm date</Button>
          </Box>
          <Typography>OR</Typography>
          <Button>Cancle Order</Button> 
        </Box>
      </Dialog>
    </>
  );
};

export default QueryDetail;
