import { apiUrl } from '../../boredLocal';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import WifiIcon from '@mui/icons-material/Wifi';
import Wifi2BarIcon from '@mui/icons-material/Wifi2Bar';
import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';
import axios from 'axios';
export default function HeadsUpButton() {
    const [pending, setPending] = useState(false);
    
  const [iconIndex, setIconIndex] = useState(0);
    
    const handleButtonClick = async () => {
        setPending(true);
    
        try {
          await axios.get(`https://localhost:7090/HeadsUp`);
        } 
        finally {
            setPending(false);
        }
      };

      const icons = [<Wifi1BarIcon />,<Wifi2BarIcon />,<WifiIcon />];

    useEffect(() => {
        let intervalId;
        if (pending) {
          intervalId = setInterval(() => {
            setIconIndex((prevIndex) => (prevIndex + 1) % 3);
          }, 500);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
      }, [pending]);
    return (
        <Button
            variant="contained"
            color="warning"
            onClick={handleButtonClick}
            >
            {pending ? icons[iconIndex] : "HeadsUp!"}
        </Button>
    );
}