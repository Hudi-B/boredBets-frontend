import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
export default function NewHorse() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    const MenuIcons = {
        'Home': <HomeRoundedIcon/>,
        'Community': <PeopleRoundedIcon/>,
        'Races': <DirectionsRunIcon/>,
        'Admin': <EngineeringRoundedIcon/>
    }

const DrawerList = (
    <Box sx={{ width: 200, height: '100%', backgroundColor: 'rgb(2, 40, 95)' }}onClick={toggleDrawer(false)}>
      <List>
      {Object.keys(MenuIcons).map((text) => (
        <ListItem key={text} disablePadding>
            <Button sx={{ marginTop: '10px', height: '50px', marginX: '5px', fontSize: '15px' }} variant="outlined" fullWidth>
            {MenuIcons[text]}
            {text}
            </Button>
        </ListItem>
        ))}
      </List>
    </Box>
  );

return(
  <div>
    <MenuTwoToneIcon onClick={toggleDrawer(true)}
        sx={{cursor: 'pointer',
        fontSize: '40px',
        marginY: '10px'}}
    />
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </div>);
}