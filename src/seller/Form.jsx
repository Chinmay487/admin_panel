import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Slider,
  Grid,
  useTheme,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NETWORK_URL } from "../links";

const Form = (props) => {
  const { key } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discount_price: "",
    quantity:10,
    category:""
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const addProductForm = {
    width: {
      lg: "50%",
      md: "50%",
      sm: "90%",
      xs: "90%",
    },
    height: "45rem",
    my: "1rem",
    mx: "auto",
    padding: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    boxShadow: theme.shadows[7],
  };

  const formBox2 = {
    width: {
      lg: "80%",
      md: "80%",
      sm: "100%",
      xs: "100%",
    },
    mx: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: {
      lg: "row",
      md: "row",
      sm: "column",
      xs: "column",
    },
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("price", productData.price);
    data.append("discount_price", productData.discount_price);
    data.append("description", productData.description);
    data.append("title", productData.title);
    data.append("quantity", productData.quantity);
    data.append("thumbnail", thumbnail);
    data.append("category",productData.category)
    productImages.forEach((file, index) => {
      let name = "image" + index;
      data.append(name, file);
    });
    const endpoint = props.isUpdate ? "seller/update" : "seller/addproduct";
    if (props.isUpdate) {
      data.append("id", key);
    }
    props.updateSpinnerState();
    const url = `${NETWORK_URL}/${endpoint}`;
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        props.updateSpinnerState();
        // alert(response.data);
        // setSnackbarOpen(true)
        navigate("/");
      })
      .catch((error) => {
        alert("something went wrong");
      });
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
        }}
        gutterBottom
      >
        {props.isUpdate ? "Update Details" : "Add New Product Form"}
      </Typography>
      {props.isUpdate ? (
        <Typography
          variant="h5"
          color="error"
          sx={{
            textAlign: "center",
            mx: "3%",
          }}
        >
          NOTE : Fill only fields You want to change
        </Typography>
      ) : null}
      <Box
        component="form"
        onSubmit={onFormSubmit}
        sx={addProductForm}
        contentType="multipart/form-data"
      >
        <TextField
          name="title"
          value={productData.title}
          onChange={onInputChange}
          variant="standard"
          label="Enter the Product Name"
          required={!props.isUpdate}
        />

        <TextField
          variant="outlined"
          name="description"
          value={productData.description}
          onChange={onInputChange}
          label="Description"
          maxRows={7}
          minRows={3}
          multiline
          required={!props.isUpdate}
        />

        <Grid container rowGap={3}>
          <Grid item md={5} sm={12} xs={12}>
            <Typography>Price</Typography>
            <TextField
              name="price"
              value={productData.price}
              onChange={onInputChange}
              sx={{
                width: {
                  lg: "75%",
                  md: "75%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
              variant="standard"
              type="number"
              label="Price"
              required={!props.isUpdate}
            />
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <Typography>Discount Price</Typography>
            <TextField
              name="discount_price"
              value={productData.discount_price}
              onChange={onInputChange}
              sx={{
                width: {
                  lg: "75%",
                  md: "75%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
              variant="standard"
              type="number"
              label="Discount Price"
              required={!props.isUpdate}
            />
          </Grid>
        </Grid>

        <Box component="div" sx={formBox2}>
          <Typography variant="subtitle1">Quantity Available</Typography>
          <Slider
            aria-label="Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={onInputChange}
            valueLabelDisplay="auto"
            min={10}
            max={50}
            sx={{
              mx: {
                sm: "1%",
                xs: "1%",
              },
              width: {
                lg: "50%",
                md: "50%",
                sm: "80%",
                xs: "80%",
              },
            }}
            required={!props.isUpdate}
          />
        </Box>

        <Box sx={formBox2}>
          {props.isUpdate ? null : (
            <>
              <Typography>
                Thumbnail Image :
                <Box
                  name="thumbnail"
                  onChange={(event) => {
                    setThumbnail(event.target.files[0]);
                  }}
                  component="input"
                  type="file"
                  accept="image/png, image/jpeg"
                  required={!props.isUpdate}
                />
              </Typography>
              <Typography>
                Detail Images :
                <Box
                  name="productImages"
                  onChange={(event) => {
                    setProductImages((oldData) => {
                      return [...oldData, ...event.target.files];
                    });
                  }}
                  component="input"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  required={!props.isUpdate}
                />
              </Typography>
            </>
          )}
        </Box>

        <Box component="div" sx={{
          my:"0.7rem",
          borderTop:"1px solid gray",
          borderBottom:"1px solid gray"
          }}>
          <Typography variant="subtitle1">
            Select Category
          </Typography>
              <RadioGroup
                row
                name="category"
                onChange={onInputChange}
              >
                <FormControlLabel value="laptop" control={<Radio/>} label="laptop" />
                <FormControlLabel value="iphone" control={<Radio/>} label="iphone" />
                <FormControlLabel value="camera" control={<Radio/>} label="camera" />
                <FormControlLabel value="watch" control={<Radio/>} label="watch" />
                <FormControlLabel value="clock" control={<Radio/>} label="clock" />
              </RadioGroup>    
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{
            display: "block",
            width: {
              lg: "30%",
              md: "30%",
              sm: "50%",
              xs: "50%",
            },
            mx: "auto",
          }}
        >
          {props.isUpdate ? "update product" : "Add Product"}
        </Button>
      </Box>
    </>
  );
};

export default Form;
