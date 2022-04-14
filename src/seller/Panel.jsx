import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
  Pagination,
} from "@mui/material";
import History from "./History";
import axios from "axios";

import { NETWORK_URL } from "../links";

const categories = ["laptop", "iphone", "camera", "clock", "watch"];
const Panel = (props) => {

  const [dataList, setDataList] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isZero, setIsZero] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback((index, pageNumber) => {
    setDataList([]);
    setFetching(true);
    axios
      .get(`${NETWORK_URL}/seller/panel/${categories[index]}/${pageNumber}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.product_list.length > 0) {
          setDataList([...data.product_list]);
        }
        setIsZero(data.product_list.length > 0);
        setFetching(false);
        setPageCount(data.number_of_pages);
      })
      .catch((error) => {
        alert("something went wrong");
        setFetching(false);
      });
  }, []);

  const upDatePageNumber = (event, value) => {
    if (value !== pageNumber) {
      setPageNumber(value);
      fetchData(currentCategoryIndex, value);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("idToken")) {
      fetchData(currentCategoryIndex, pageNumber);
    }
    return () => {
      setDataList([]);
    };
  }, [fetchData, setCurrentCategoryIndex,currentCategoryIndex,pageNumber]);

  return (
    <Box sx={{ my: "2rem" }}>
      <>
        {" "}
        <Box component="center" sx={{ my: "1rem" }}>
          <Button
            onClick={() => {
              setCurrentCategoryIndex(0);
              fetchData(0, pageNumber);
            }}
            variant="text"
            disabled={currentCategoryIndex === 0}
          >
            Laptop
          </Button>
          <Button
            onClick={() => {
              setCurrentCategoryIndex(1);
              fetchData(1, pageNumber);
            }}
            disabled={currentCategoryIndex === 1}
          >
            iPhone
          </Button>
          <Button
            onClick={() => {
              setCurrentCategoryIndex(2);
              fetchData(2, pageNumber);
            }}
            disabled={currentCategoryIndex === 2}
          >
            Camera
          </Button>
          <Button
            onClick={() => {
              setCurrentCategoryIndex(3);
              fetchData(3, pageNumber);
            }}
            disabled={currentCategoryIndex === 3}
          >
            Clock
          </Button>
          <Button
            onClick={() => {
              setCurrentCategoryIndex(4);
              fetchData(4, pageNumber);
            }}
            disabled={currentCategoryIndex === 4}
          >
            watch
          </Button>
        </Box>
      </>
      <Box
        sx={{
          my: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={pageCount}
          defaultPage={1}
          color="primary"
          variant="outlined"
          shape="rounded"
          showFirstButton={true}
          showLastButton={true}
          onChange={upDatePageNumber}
        />
      </Box>
      {fetching ? (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "3rem",
            }}
          >
            <Typography variant="h5">Fetching your products &nbsp;</Typography>
            <CircularProgress />
          </Box>
        </>
      ) : null}

      {!fetching && !isZero ? (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">No products added</Typography>
          </Box>
        </>
      ) : (
        <>
          {dataList.length > 0 ? (
            <>
              <Grid
                container
                rowGap={3}
                sx={{
                  width: {
                    lg: "70%",
                    md: "70%",
                    sm: "90%",
                    xs: "90%",
                  },
                  mx: "auto",
                }}
              >
                {dataList.map((item) => {
                  return (
                    <History
                      isCart={false}
                      isSeller={props.isSeller}
                      item={item}
                      key={item.key}
                      fetchData={fetchData}
                      category={categories[currentCategoryIndex]}
                      pageNumber={pageNumber}
                    />
                  );
                })}
              </Grid>
        
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default Panel;
