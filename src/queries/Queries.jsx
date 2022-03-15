import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { NETWORK_URL } from "../links";
import QueryInfo from "./QueryInfo";

const Queries = () => {
  const [shippingStatus, setShippingStatus] = useState("pending");
  const theme = useTheme();

  const [shippingData, setShippingData] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [isData, setIsData] = useState(0);

  const fetchData = useCallback((isMounted, status) => {
    setDataStatus(true);
    if (isMounted) {
      axios
        .post(`${NETWORK_URL}/seller/payment/${status}`, {
          idToken: window.localStorage.getItem("idToken"),
        })
        .then((response) => {
          // console.log(response.data)
          if (response.data.length > 0) {
            setShippingData([...response.data]);
          }
          setIsData(response.data.length);
          setDataStatus(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted, "pending");
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return (
    <>
      <Typography>Queries Page</Typography>
      <Box component="center">
        <Button
          onClick={() => {
            setShippingStatus("pending");
            fetchData(true, "pending");
          }}
          variant="text"
          disabled={shippingStatus === "pending"}
        >
          Pending
        </Button>
        <Button
          onClick={() => {
            setShippingStatus("dispatched");
            fetchData(true, "dispatched");
          }}
          disabled={shippingStatus === "dispatched"}
        >
          Dispatched
        </Button>
        <Button
          onClick={() => {
            setShippingStatus("delivered");
            fetchData(true, "delivered");
          }}
          disabled={shippingStatus === "delivered"}
        >
          Delivered
        </Button>
        <Button
          onClick={() => {
            setShippingStatus("cancled");
            fetchData(true, "cancled");
          }}
          disabled={shippingStatus === "cancled"}
        >
          Cancled
        </Button>
      </Box>
      {dataStatus ? (
        <Box>
          <Typography> Loading</Typography>...
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: {
              lg: "50%",
              md: "50%",
              sm: "100%",
              xs: "100%",
            },
            border: "1px solid #CFD8DC",
            boxShadow: theme.shadows[5],
            margin: "0.5rem auto",
          }}
        >
          {isData > 0 ? (
            <>
              {shippingData.map((item, index) => {
                return (
                  <>
                    <QueryInfo
                      item={item}
                      key={`shipping_${shippingStatus}${index}0`}
                    />
                  </>
                );
              })}
            </>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default Queries;
