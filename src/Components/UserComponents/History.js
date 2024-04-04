import React from "react";
import { Box, Grid, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const MenuChip = styled(Chip)(({ theme }) => ({
    height: '50px',
    fontSize: '20px',
    width: '100%'
  }));

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
            <Grid container spacing={2} sx={{width: '100%'}}>
                <Grid item xs={6}>
                    <MenuChip label="Betting history" onClick={() => {  }} />
                </Grid>
                <Grid item xs={6}>
                    <MenuChip label="Billing history" onClick={() => {  }} />
                </Grid>
            </Grid>
        </Box>
    );
}