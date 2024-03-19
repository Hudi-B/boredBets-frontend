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

export default function HamburgerMenu({isAdmin}) {
    const [open, setOpen] = React.useState(false);
    const menuItems = [
          {
            "name": "Home",
            "icon": <HomeRoundedIcon style={{marginRight: '5px'}}/>,
            "link": "/"
          },
          {
            "name": "Community",
            "icon": <PeopleRoundedIcon style={{marginRight: '5px'}}/>,
            "link": "/Community"
          },
          {
            "name": "Races",
            "icon": <StadiumRoundedIcon style={{marginRight: '5px'}}/>,
            "link": "/Races"
          }
        ]
    
    
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

const DrawerList = (
    <Box sx={{ width: 180, height: '100%', backgroundColor: 'rgb(2, 40, 95)' }}onClick={toggleDrawer(false)}>
      <List sx={{ height:'100%' }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button component={Link} to={item.link} sx={{justifyContent: 'flex-start', marginTop: '10px', height: '50px', marginX: '5px', fontSize: '15px' }} variant="outlined" fullWidth>
            {item.icon} {item.name}
            </Button>
        </ListItem>
        ))}
        {isAdmin && (
          <ListItem key="Admin" sx={{position: 'absolute', bottom: 20}} disablePadding>
              <Button component={Link} to="/Admin" sx={{ justifyContent: 'flex-start', marginTop: '10px', height: '50px', marginX: '5px', fontSize: '15px' }} variant="outlined" fullWidth>
                <EngineeringRoundedIcon style={{marginRight: '5px'}} />ADMIN
              </Button>
          </ListItem>
        )}
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
