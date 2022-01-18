import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { NETWORK_URL } from "../links";
import ReviewCard from "./ReviewCard";

// viewreview
const ReviewPage = () => {
  const { key } = useParams();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [noReview, setNoReview] = useState(false);
  const [reviewArray, setReviewArray] = useState([]);

  const fetchReviews = useCallback(() => {
    setFetchStatus(true);
    axios
      .get(`${NETWORK_URL}/client/viewreview/${key}`)
      .then((response) => {
        setNoReview(response.data.length === 0);
        // console.log(response.data);
        setReviewArray([...response.data]);
        setFetchStatus(false);
      })
      .catch((error) => {
        alert("something went wrong");
      });
  }, [key]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <Box sx={{ mt: "10rem" }}>
      {fetchStatus ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "2rem",
          }}
        >
          <Typography variant="h4">Fetching... &nbsp;</Typography>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {noReview ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                my: "2rem",
              }}
            >
              <Typography variant="h3">No reviews yet</Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  my: "2rem",
                }}
              >
                <Typography variant="h4">Product reviews</Typography>
              </Box>
              <Grid
                container
                rowGap={2}
                sx={{
                  width: {
                    lg: "80%",
                    md: "80%",
                    sm: "95%",
                    xs: "95%",
                  },
                  my: "2rem",
                  mx: "auto",
                }}
              >
                {reviewArray.map((item) => {
                  return <ReviewCard item={item} />;
                })}
                {/*  */}
              </Grid>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ReviewPage;
