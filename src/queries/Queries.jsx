import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { NETWORK_URL } from "../links";
import QueryInfo from "./QueryInfo";

const Queries = () => {
  const [shippingStatus, setShippingStatus] = useState("pending");

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
          console.log(response.data)
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
            setDataStatus(false);
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
            setDataStatus(false);
            fetchData(true, "dispatched");
          }}
          disabled={shippingStatus === "dispatched"}
        >
          Dispatched
        </Button>
        <Button
          onClick={() => {
            setShippingStatus("delivered");
            setDataStatus(false);
            fetchData(true, "delivered");
          }}
          disabled={shippingStatus === "delivered"}
        >
          Delivered
        </Button>
      </Box>
      {dataStatus ? (
        <Box component="center" sx={{display:"flex",justifyContent:"center",alignItems:"center",my:"1rem"}} >
          <Typography variant="h5"> Loading...</Typography> &nbsp; 
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {isData > 0 ? (
            <>
              {shippingData.map((item, index) => {
                console.log(item)
                return (
                  <>
                    <QueryInfo
                      item={item}
                      fetchData={fetchData}
                      key={`shipping_${shippingStatus}${index}0`}
                      status={shippingStatus}
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
