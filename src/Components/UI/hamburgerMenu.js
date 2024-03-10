import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { Link } from 'react-router-dom';
export default function NewHorse(isAdmin) {
    const [open, setOpen] = React.useState(false);
    const [userIsAdmin, setUserIsAdmin] = React.useState(isAdmin);
    const menuItems = [
          {
            "name": "Home",
            "icon": <HomeRoundedIcon/>,
            "link": "/"
          },
          {
            "name": "Community",
            "icon": <PeopleRoundedIcon/>,
            "link": "/Community"
          },
          {
            "name": "Races",
            "icon": <StadiumRoundedIcon/>,
            "link": "/Races"
          },
          {
            "name": "Admin",
            "icon": <EngineeringRoundedIcon/>,
            "link": "/Admin"
          }
        ]
    
    
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

const DrawerList = (
    <Box sx={{ width: 200, height: '100%', backgroundColor: 'rgb(2, 40, 95)' }}onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
          <Button component={Link} to={item.link} sx={{ marginTop: '10px', height: '50px', marginX: '5px', fontSize: '15px' }} variant="outlined" fullWidth>
          {item.icon}
          {item.name.toUpperCase()}
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