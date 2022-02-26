import React, { useState, useEffect, useCallback } from "react";
import { Grid, Typography, CircularProgress, Box, Button } from "@mui/material";
import History from "./History";
import axios from "axios";

import { NETWORK_URL } from "../links";

const Panel = (props) => {
  const [dataList, setDataList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("laptop");
  const [isZero, setIsZero] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchData = useCallback((index) => {
    let categories = ["laptop", "iphone", "camera", "clock", "watch"];
    setCurrentCategory(categories[index]);
    setDataList([]);
    setFetching(true);
    axios
      .get(`${NETWORK_URL}/seller/panel/${categories[index]}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.length > 0) {
          setDataList([...data]);
        }
        setIsZero(data.length > 0);
        setFetching(false);
      })
      .catch((error) => {
        alert("something went wrong");
        setFetching(false);
      });
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("idToken")) {
      fetchData(0);
    }
    return () => {
      setDataList([]);
    };
  }, [fetchData]);

  return (
    <Box sx={{ mt: "2rem" }}>
      <>
        {" "}
        <Box component="center" sx={{ my: "1rem" }}>
          <Button
            onClick={() => {
              fetchData(0);
            }}
            variant="text"
            disabled={ currentCategory === "laptop" }
          >
            Laptop
          </Button>
          <Button
            onClick={() => {
              fetchData(1);
            }}
            disabled={ currentCategory === "iphone" }
          >
            iPhone
          </Button>
          <Button
            onClick={() => {
              fetchData(2);
            }}
            disabled={ currentCategory === "camera" }
          >
            Camera
          </Button>
          <Button
            onClick={() => {
              fetchData(3);
            }}
            disabled={ currentCategory === "clock" }
          >
            Clock
          </Button>
          <Button
            onClick={() => {
              fetchData(4);
            }}
            disabled={ currentCategory === "watch" }
          >
            watch
          </Button>
        </Box>
      </>

      {fetching ? (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                      category={currentCategory}
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
