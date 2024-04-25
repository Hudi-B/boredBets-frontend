import React, { useEffect } from "react";
import { Box, Grid, Chip, Paper, Stack, Typography   } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';
import TransactionCard from "./TransactionCard";

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

export default function History() {
    const userId = useSelector((state) => state.auth.userId);
    const [historyData, setHistoryData] = React.useState([]);

    useEffect(() => {
        fetchData();
        console.log(historyData);
    }, [userId]);

    const fetchData = async () => {
        await axios.get(apiUrl+`UserDetail/GetAllTransactionsByUserId?UserId=` + userId)
        .then((response) => {
            setHistoryData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

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
                {
                    historyData.map((transaction) => (
                        <TransactionCard key={transaction.id} amount={transaction.amount} type={transaction.transactionType} created={transaction.created} detail={transaction.detail}/>
                    ))
                }
            </Stack>
        </Box>
    );
}