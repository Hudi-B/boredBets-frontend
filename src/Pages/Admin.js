import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NewHorse from '../Components/AdminComponents/NewHorse';
import NewJockey from '../Components/AdminComponents/NewJockey';
import NewTrack from '../Components/AdminComponents/NewTrack';


import '../styles/Admin.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.grey[300], 

    padding: theme.spacing(2),
    textAlign: 'flex-start',
    color: theme.palette.text.secondary
  }));

  
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Admin() {
    return (
        <Stack className='Container'   
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}>
            <Item> <NewHorse /> </Item>
            <Item> <NewJockey /> </Item>
            <Item> <NewTrack /> </Item>
        </Stack>
    );
  }
  
  