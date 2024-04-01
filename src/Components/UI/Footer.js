import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <footer>
            <Box sx={{
            width: '100%',
            height: '100px',
            color: 'white',
            backgroundColor: 'rgba(50, 50, 50, 1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            position: 'relative',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)', }}
            >
                <Typography>Footer</Typography>
            </Box>
        </footer>
    );
}