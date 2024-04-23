import React from "react";
import { Box, Grid, Chip, Paper, Stack, Typography   } from "@mui/material";
import { styled } from "@mui/material/styles";

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

export default function History() {

    

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
            <Stack direction={'column'} spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
                <TilePaper sx={{ textAlign: 'left' }}>
                    <Typography variant="h5">History</Typography>
                </TilePaper>

            </Stack>
        </Box>
    );
}