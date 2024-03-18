import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Stack, Typography, Box, IconButton, Tooltip } from "@mui/material";
import axios from 'axios';
import { useSelector } from "react-redux";
import { apiUrl } from '../../boredLocal';
import DeleteIcon from '@mui/icons-material/Delete';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '98%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const CaptionText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.caption.fontSize,
    color: 'lightgray',
}))

const BackgroundBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgb(0, 93, 93)',
    padding: theme.spacing(1),
    borderRadius: '5px',
}))

export default function CardPaper({ cardName, cardNumber, expirationYear, expirationMonth, holderName, cvc, onDelete }) {

    return (
        <TilePaper>
            <Stack direction={'column'} spacing={1} sx={{ padding: '10px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction="column" alignItems="start">
                        <CaptionText>Card name</CaptionText>
                        <BackgroundBox>
                            <Typography variant="h5">{cardName}</Typography>
                        </BackgroundBox>
                    </Stack>
                        <Typography>Visa/Mastercard icon</Typography>
                </Stack>

                <Stack direction={'row'} spacing={10}>
                    <Stack direction="column" alignItems="start">
                        <CaptionText>Card number</CaptionText>
                        <BackgroundBox>
                            <Typography variant="h5">{cardNumber}</Typography>
                        </BackgroundBox>
                    </Stack>
                    <Stack direction="column" alignItems="start">
                        <CaptionText>Expiration date</CaptionText>
                        <BackgroundBox>
                            <Typography variant="h5">{expirationMonth}/{expirationYear}</Typography>
                        </BackgroundBox>
                    </Stack>
                </Stack>

                <Stack direction={'row'} spacing={4} alignItems="center">
                    <Stack direction="column" alignItems="start">
                        <CaptionText>Holder name</CaptionText>
                        <BackgroundBox>
                            <Typography variant="h5">{holderName}</Typography>
                        </BackgroundBox>
                    </Stack>
                    <Stack direction="column" alignItems="start" sx={{ width: '100%' }}>
                        <CaptionText>CVC</CaptionText>
                        <BackgroundBox>
                            <Typography variant="h5">{cvc.charAt(0)}**</Typography>
                        </BackgroundBox>
                    </Stack>
                    <Stack sx={{ marginLeft: 'auto', marginBottom: 'auto' }}>
                        <Tooltip title="Remove">
                            <IconButton aria-label="delete" size="large" onClick={onDelete}>
                                <DeleteIcon style={{ color: 'white' }}/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
        </TilePaper>
    );
}