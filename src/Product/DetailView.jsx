import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

import Review from "./Review";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NETWORK_URL } from "../links";
import ImageSlider from "./ImageSlider";

const DetailView = (props) => {
  const { category,key } = useParams();

  const gridBox2 = {
    display: "flex",
    justifyContent: {
      lg: "space-evenly",
      md: "space-evenly",
      sm: "space-between",
      xs: "space-between",
    },
    flexDirection: {
      lg: "row",
      md: "row",
      sm: "column",
      xs: "column",
    },
    width: "100%",
    mx: {
      lg: "auto",
      md: "auto",
    },
    my: {
      sm: "2%",
      xs: "2%",
    },
  };

  const buttonGroupStyle1 = {
    width: {
      lg: "30%",
      md: "30%",
      sm: "70%",
      xs: "70%",
    },
    my: {
      sm: "1%",
      xs: "1%",
    },
    mx: {
      sm: "auto",
      xs: "auto",
    },
  };

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    productImages: [],
  });

  const [fetchStatus, setFetchStatus] = useState(true);

  const fetchData = useCallback(
    (isMounted) => {
      axios
        .get(`${NETWORK_URL}/client/detail/${category}/${key}`)
        .then((response) => response.data)
        .then((data) => {
          if (isMounted) {
            setProductData({
              title: data.title,
              description: data.description,
              price: data.price,
              discountPrice: data.discount_price,
              quantity: data.quantity,
              productImages: data.images,
            });
            setFetchStatus(false);
          }
        })
        .catch((error) => {
          alert("something went wrong");
        });
    },
    [key,category]
  );

  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);
    return () => {
      isMounted = true;
      setProductData({
        title: "",
        description: "",
        price: "",
        discountPrice: "",
        quantity: "",
        productImages: [],
      })
    };
  }, [fetchData]);

  const navigate = useNavigate();

  const gotoUpdate = () => {
    navigate(`/update/${category}/${key}`);
  };

  return (
    <>
      {fetchStatus ? (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "20rem",
            }}
          >
            <Typography variant="h4">Fetching... &nbsp; </Typography>
            <CircularProgress />
          </Box>{" "}
        </>
      ) : (
        <>
          <Grid container sx={{ mt: "2rem" }} rowGap={4}>
            <Grid item md={12}>
              <Grid container columnGap={3}>
                <Grid item md={4.5} sm={12} xs={12}>
                  {/* <Box
                    component="img"
                    src={productData.productImages[index]}
                    sx={{
                      maxWidth: "100%",
                      height: "27rem",
                    }}
                  /> */}
                  <ImageSlider productImages={productData.productImages} />
                </Grid>
                <Grid item md={7} sm={12} xs={12}>
                  <Box
                    component="div"
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      padding: "1%",
                    }}
                  >
                    <Box
                      sx={{
                        mx: {
                          sm: "5%",
                          xs: "5%",
                        },
                      }}
                    >
                      <Typography variant="h5">{productData.title}</Typography>
                      <Rating name="read-only" value={4} readOnly />
                      <Typography>
                        Price : &#8377;{productData.price}{" "}
                      </Typography>
                      <Typography>
                        Discount price : &#8377; {productData.discountPrice}
                      </Typography>
                      <Typography>Quantity : {productData.quantity}</Typography>
                      <Typography>{productData.description}</Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: {
                          lg: "flex-start",
                          md: "flex-start",
                          sm: "center",
                          xs: "center",
                        },
                        alignItems: "center",
                      }}
                    >
                    </Box>
                    <Box sx={gridBox2}>
                      <Button
                        variant="contained"
                        onClick={gotoUpdate}
                        sx={buttonGroupStyle1}
                      >
                        Update
                      </Button>
                      {/* ) : null} */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12} sx={{ backgroundColor: "#F5F5F5" }}>
              <Grid container spacing={3} sx={{ my: "2%" }}>
                <Grid item md={12}>
                  <Review />
                  <Review />
                  <Button
                    variant="outlined"
                    sx={{
                      display: "block",
                      mx: "auto",
                    }}
                    onClick={() => {
                      navigate(`/review/${category}/${key}`);
                    }}
                  >
                    View More
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default DetailView;
