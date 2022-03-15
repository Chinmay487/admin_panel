import React from 'react';
import {Box,Typography} from '@mui/material';


const ErrorPage = () => {
    return <>
        <Box sx={{my:"10rem",width:"50%",mx:"auto",textAlign:"center"}}>
            <Typography variant='h1'>
                404 Page not found
            </Typography>
        </Box>
    </>
}


export default ErrorPage;
