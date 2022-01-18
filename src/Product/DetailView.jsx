import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Grid,
  TextField,
  useTheme,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Review from "./Review";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NETWORK_URL } from "../links";

const DetailView = (props) => {
  const theme = useTheme();
  const { key } = useParams();

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
    // backgroundColor:"red"
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

  const formStyle1 = {
    display: "flex",
    width: "90%",
    mx: "auto",
    height: "20rem",
    padding: "1%",
    backgroundColor: "#ECEFF1",
    boxShadow: theme.shadows[7],
    flexDirection: "column",
    justifyContent: "space-evenly",
  };

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    quantity: "",
    productImages: [],
  });

  const [index, setIndex] = useState(0);
  const [fetchStatus, setFetchStatus] = useState(true);

  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const [reviewFormStatus, setReviewFormStatus] = useState(false);

  const fetchData = useCallback(
    (isMounted) => {
      axios
        .get(`${NETWORK_URL}/client/detail/${key}`)
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
    [key]
  );

  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);
    return () => {
      isMounted = true;
    };
  }, [fetchData]);

  setInterval(() => {
    const l = productData.productImages.length;
    if (l > 0) {
      setIndex((oldIndex) => {
        return (oldIndex + 1) % l;
      });
    }
  }, 6000);

  // console.log(productData)

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData((oldvalue) => {
      return {
        ...oldvalue,
        [name]: value,
      };
    });
  };

  const onReviewSubmit = (event) => {
    event.preventDefault();
    setReviewFormStatus(true);
    const data = new FormData();
    data.append("id", key);
    data.append("title", reviewData.title);
    data.append("description", reviewData.description);
    data.append("rating", reviewData.rating);
    axios
      .post(`${NETWORK_URL}/client/review`, data)
      .then((response) => {
        alert(response.data);
        setReviewFormStatus(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("something went wrong");
        window.location.reload();
      });
  };

  const navigate = useNavigate();

  const gotoUpdate = () => {
    navigate(`/update/${key}`);
  };

  const [selectState, setSelectState] = useState(1);

  const addProductToCart = (message, cart) => {
    axios
      .post(`${NETWORK_URL}/client/update_cart`, {
        product_id: key,
        quantity: selectState,
        add: true,
        index: -1,
        is_qty: false,
        price: productData.discountPrice,
        idToken: window.localStorage.getItem("idToken"),
      })
      .then((response) => {
        // console.log(response.data)
        if (cart) {
          alert(message);
        } else {
          navigate("/viewcart");
        }
      })
      .catch((error) => {
        console.log("something went wrong");
      });
  };

  const addToCart = () => {
    addProductToCart("Added to your cart", true);
  };

  const buyNow = () => {
    addProductToCart("", false);
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
          <Grid container sx={{ mt: "10rem" }} rowGap={4}>
            <Grid item md={12}>
              <Grid container columnGap={3}>
                <Grid item md={4.5} sm={12} xs={12}>
                  <Box
                    component="img"
                    src={productData.productImages[index]}
                    sx={{
                      maxWidth: "100%",
                      height: "27rem",
                    }}
                  />
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
                      <Typography variant="h6"> Qty : &nbsp;</Typography>
                      <Box
                        component="select"
                        onChange={(event) => {
                          setSelectState(event.target.value);
                        }}
                        sx={{
                          fontSize: "1.3rem",
                        }}
                      >
                        <Box component="option" value={1} selectteed>
                          1
                        </Box>
                        <Box component="option" value={2} selectteed>
                          2
                        </Box>
                        <Box component="option" value={3} selectteed>
                          3
                        </Box>
                        <Box component="option" value={4} selectteed>
                          4
                        </Box>
                        <Box component="option" value={5} selectteed>
                          5
                        </Box>
                        <Box component="option" value={6} selectteed>
                          6
                        </Box>
                        <Box component="option" value={7} selectteed>
                          7
                        </Box>
                        <Box component="option" value={8} selectteed>
                          8
                        </Box>
                        <Box component="option" value={9} selectteed>
                          9
                        </Box>
                        <Box component="option" value={10} selectteed>
                          10
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={gridBox2}>
                      {window.localStorage.getItem("idToken") ? (
                        <>
                          <Button
                            variant="contained"
                            sx={buttonGroupStyle1}
                            onClick={buyNow}
                          >
                            <ShoppingBagOutlinedIcon />
                            &nbsp; Buy now
                          </Button>
                          <Button
                            variant="contained"
                            sx={buttonGroupStyle1}
                            onClick={addToCart}
                          >
                            <AddShoppingCartOutlinedIcon />
                            &nbsp; Add to Cart
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            sx={buttonGroupStyle1}
                            disabled
                          >
                            <ShoppingBagOutlinedIcon />
                            &nbsp; Buy now
                          </Button>
                          <Button
                            variant="contained"
                            sx={buttonGroupStyle1}
                            disabled
                          >
                            <AddShoppingCartOutlinedIcon />
                            &nbsp; Add to Cart
                          </Button>
                        </>
                      )}

                      {props.isSeller ? (
                        <Button
                          variant="contained"
                          onClick={gotoUpdate}
                          sx={buttonGroupStyle1}
                        >
                          Update
                        </Button>
                      ) : null}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12} sx={{ backgroundColor: "#F5F5F5" }}>
              <Grid container spacing={3} sx={{ my: "2%" }}>
                <Grid item md={5} sm={12} xs={12}>
                  <Box
                    component="form"
                    onSubmit={onReviewSubmit}
                    sx={formStyle1}
                  >
                    <Typography variant="h6">
                      {" "}
                      Share your Experience{" "}
                    </Typography>

                    <TextField
                      id="filled-basic"
                      label="Filled"
                      variant="standard"
                      name="title"
                      value={reviewData.title}
                      onChange={onInputChange}
                      required={true}
                    />

                    <TextField
                      placeholder="Share your Experience"
                      maxRows={7}
                      minRows={3}
                      variant="standard"
                      multiline
                      name="description"
                      value={reviewData.description}
                      onChange={onInputChange}
                      required={true}
                    />

                    <Box
                      component="div"
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "base-line",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {" "}
                        Rate Us &nbsp;
                      </Typography>
                      <Rating
                        value={reviewData.rating}
                        name="rating"
                        onChange={onInputChange}
                      />
                    </Box>
                    {reviewFormStatus ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        {window.localStorage.getItem("idToken") ? (
                          <>
                            <Button
                              variant="outlined"
                              type="submit"
                              sx={{
                                display: "block",
                                width: "30%",
                              }}
                            >
                              Post
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              type="submit"
                              sx={{
                                display: "block",
                                width: "30%",
                              }}
                              disabled
                            >
                              Post
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid item md={7}>
                  <Review />
                  <Review />
                  <Button
                    variant="outlined"
                    sx={{
                      display: "block",
                      mx: "auto",
                    }}
                    onClick={() => {
                      navigate(`/review/${key}`);
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
