import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Paper, Stack, Typography, Avatar, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';
import TransactionCard from "./TransactionCard";
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(50, 50, 50, 0.2)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

export default function History() {
    const userId = useSelector((state) => state.auth.userId);
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const fetchData = async () => {
        await axios.get(apiUrl+`UserDetail/GetAllTransactionsByUserId?UserId=` + userId)
        .then((response) => {
            setHistoryData(response.data);
        })
        .catch(() => {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                {isLoading ? (
                    <>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} variant="rounded" animation="wave" width={'98%'} height={100} />
                        ))}
                    </>
                ) : (
                    historyData.length > 0 ? (
                        historyData.reverse().map((transaction) => (
                            <TransactionCard key={transaction.id} amount={transaction.amount} type={transaction.transaction_Type} created={transaction.created} detail={transaction.detail}/>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', padding: '50px' }}>
                            <Typography variant="h2">No transactions yet.</Typography>
                            <Typography variant="h5">Start making some bored bets!</Typography>
                            <Avatar variant="square" src={process.env.PUBLIC_URL + "images/errorcatlight.png"} sx={{ width: 'auto', height: '300px' }} />
                        </Box>
                        )
                )
                }
            </Stack>
        </Box>
    );
}