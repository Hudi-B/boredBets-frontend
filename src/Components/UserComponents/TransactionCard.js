import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Button, Grid} from '@mui/material/';
import moment from 'moment';
import {Link} from 'react-router-dom';


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

    return (
        <TilePaper>
            <Grid container direction="row">
                <Grid item sm={3} xs={6} direction="column" spacing={1} alignItems={'start'}>
                    <CaptionText>Type</CaptionText>
                    <Typography variant="h5">{type}</Typography>
                </Grid>
                <Grid item sm={3} xs={6} direction="column" spacing={1} alignItems={'center'}>
                    <CaptionText>Time</CaptionText>
                    <Typography variant="h5">{moment.utc(created).local().format('YYYY-MM-DD HH:mm')}</Typography>
                </Grid>
                {type === 'Bet' || type === 'OutCome' ? (
                    <Grid item sm={3} xs={6} direction="column" spacing={1} alignItems={'center'}>
                        <CaptionText>Race</CaptionText>
                        <Button variant="contained" component={Link} to={`/race/${detail}`} >Go to race</Button>
                    </Grid>
                ) : (
                    <Grid item sm={3} xs={6} direction="column" spacing={1} alignItems={'center'}>
                        <CaptionText>Card</CaptionText>
                        <Typography variant="h5">{detail}</Typography>
                    </Grid>
                )
                }
                <Grid item sm={3} xs={6} direction="column" spacing={1} alignItems={'end'}>
                    <CaptionText>Amount</CaptionText>
                    <Typography variant="h5" sx={{ color: amount > 0 ? 'limegreen' : 'firebrick' }} >{formatCurrency(amount)}</Typography>
                </Grid>
            </Grid>
        </TilePaper>
  );
};

export default TransactionCard;