import React from "react";
import { useState } from "react";
import { Box, Typography, Grid, Chip, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
}))

export default function Billing() {
    return (
        <Box sx={{ 
            width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px', 
            margin: '0px', 
            overflowY: ''}}
        >
            <TilePaper sx={{ height: '600px' }}>
                <Typography variant="h5">Manage your cards:</Typography>
            </TilePaper>
        </Box>
    );
}