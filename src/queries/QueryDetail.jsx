import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  Button,
  // breadcrumbsClasses,
} from "@mui/material";
import axios from "axios";
import { NETWORK_URL } from "../links";

const QueryDetail = (props) => {
  const [deliveryDate, setDelivaryDate] = useState("");

  const onConfirmDispatch = () => {
    if (deliveryDate !== "") {
      axios
        .post(`${NETWORK_URL}/seller/dispatch`, {
          idToken: window.localStorage.getItem("idToken"),
          order_date_by_seller: deliveryDate,
          user_info: props.item,
        })
        .then((response) => {
          console.log(response.data);
          props.changeQueryDetailstatus();
          props.fetchData(true, props.status);
        })
        .catch((error) => {
          console.log("something went wrong");
        });
    }
  };

  const onConfirmDelivered = () => {
    axios
      .post(`${NETWORK_URL}/seller/delivered`, {
        idToken: window.localStorage.getItem("idToken"),
        // order_date_by_seller: deliveryDate,
        user_data: props.item,
      })
      .then((response) => {
        console.log(response.data);
        props.changeQueryDetailstatus();
        props.fetchData(true, props.status);
      })
      .catch((error) => {
        console.log("something went wrong");
      });
  };

  const onDateChange = (event) => {
    const { value } = event.target;
    setDelivaryDate(value);
  };

  let city = "";
  let state = "";
  let district = "";
  let line1 = "";
  let line2 = "";
  let pin = "";
  let prod_array = [];
  let total = 0;
  let payment_date = "";

  switch (props.status) {
    case "pending":
      city = props.item.shipping_address.city;
      state = props.item.shipping_address.state;
      district = props.item.shipping_address.district;
      line1 = props.item.shipping_address.line1;
      line2 = props.item.shipping_address.line2;
      pin = props.item.shipping_address.pin;
      prod_array = props.item.products;
      total = props.item.total;
      payment_date = props.item.payment_date;
      break;
    case "dispatched":
      city = props.item.user_info.shipping_address.city;
      state = props.item.user_info.shipping_address.state;
      district = props.item.user_info.shipping_address.district;
      line1 = props.item.user_info.shipping_address.line1;
      line2 = props.item.user_info.shipping_address.line2;
      pin = props.item.user_info.shipping_address.pin;
      prod_array = props.item.user_info.products;
      total = props.item.user_info.total;
      payment_date = props.item.user_info.payment_date;
      break;
    case "delivered":
      city = props.item.user_info.shipping_address.city;
      state = props.item.user_info.shipping_address.state;
      district = props.item.user_info.shipping_address.district;
      line1 = props.item.user_info.shipping_address.line1;
      line2 = props.item.user_info.shipping_address.line2;
      pin = props.item.user_info.shipping_address.pin;
      prod_array = props.item.user_info.products;
      total = props.item.user_info.total;
      payment_date = props.item.user_info.payment_date;
      break;
    default:
      break;
  }

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
            {prod_array.map((product, index) => {
              return (
                <Typography key={`seller${product}${index}`}>
                  {product}
                </Typography>
              );
            })}
            <Typography>Price : &#x20B9;{total}</Typography>
            <Typography>Payment Date : {payment_date}</Typography>
            {props.status === "dispatched" || props.status === "delivered" ? (
              <Typography>
                Delivery Date : {props.item.delivery_date}
              </Typography>
            ) : null}
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
            <Typography> Address Line 1 : {line1} </Typography>
            <Typography> Address Line 2 : {line2} </Typography>
            <Typography> City : {city} </Typography>
            <Typography> District : {district} </Typography>
            <Typography> State : {state} </Typography>
            <Typography> Pincode : {pin} </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "80%",
            mx: "auto",
            my: "0.5rem",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              mx: "auto",
              my: "0.4rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.status === "pending" ? (
              <>
                <Box
                  component="input"
                  type="date"
                  name="deliveryDate"
                  id="deliveryDate"
                  value={deliveryDate}
                  onChange={onDateChange}
                />
                <Button onClick={onConfirmDispatch}>Confirm date</Button>
              </>
            ) : null}
            {props.status === "dispatched" ? (
              <Button onClick={onConfirmDelivered}>Mark Delivered</Button>
            ) : null}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default QueryDetail;
