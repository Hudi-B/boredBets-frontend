import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Stack, Typography } from '@mui/material/';


const TilePaper = styled(Paper)(({ theme }) => ({
    width: '98%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(50, 50, 50, 0.2)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const CaptionText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.caption.fontSize,
    color: 'lightgray',
}))

const TransactionCard = ({ amount, created, type, detail }) => {

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    };

    const formatDate = (value) => {
        const rawDate = new Date(value);
        return rawDate.toLocaleTimeString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <TilePaper>
            <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1} alignItems={'start'}>
                    <CaptionText>Type</CaptionText>
                    <Typography variant="h5">{type}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} alignItems={'start'}>
                    <CaptionText>Time</CaptionText>
                    <Typography variant="h5">{formatDate(created)}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} alignItems={'start'}>
                    <CaptionText>From</CaptionText>
                    <Typography variant="h5">{detail}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} alignItems={'start'}>
                    <CaptionText>Amount</CaptionText>
                    <Typography variant="h5" sx={{ color: amount > 0 ? 'limegreen' : 'firebrick' }} >{ amount > 0 && '+'  }{formatCurrency(amount)}</Typography>
                </Stack>
            </Stack>
        </TilePaper>
  );
};

export default TransactionCard;