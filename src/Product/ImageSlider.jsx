import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const getTimeInterval = useCallback(() => {
    setInterval(() => {
      const l = props.productImages.length;
      if (l > 0) {
        setCurrentIndex((oldIndex) => {
          return (oldIndex + 1) % l;
        });
      }
    }, 6000);
  }, [props.productImages.length]);

  useEffect(() => {
    getTimeInterval();
  }, [getTimeInterval]);

  return (
    <>
      {props.productImages.map((productImage, index) => {
        let opacity = currentIndex === index ? 1 : 0;
        let visibility = currentIndex === index ? "visible" : "hidden";
        let maxWidth = currentIndex === index ? "100%" : "0";
        return (
          <>
            <Box
              component="img"
              src={productImage}
              alt="product Image"
              sx={{
                maxWidth: {maxWidth},
                height: "27rem",
                transition: "all 0.6s ease",
                visibility:{visibility},
                opacity:{opacity}
              }}

            />
          </>
        );
      })}
    </>
  );
};

export default ImageSlider;
