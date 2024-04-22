import AuthPopup from './AuthPopup';
import {Box, Button, AppBar, Chip, Stack, Hidden, IconButton, Tooltip} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import {Link} from 'react-router-dom';
import Hamburger from './HamburgerMenu';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import numeral from 'numeral';

import HeadsUpButton from './HeadsUpButton';
import Notifications from './notification';
import { Wallet } from '@mui/icons-material';

export default function Navbar( {background} ) {
  const userData = useSelector((state) => state.auth);

const RightBoxContent = () => {
    const formattedWallet = (userData.wallet >= 1000) ? numeral(userData.wallet).format('0.0a') : numeral(userData.wallet).format('0,0');
    if (userData.isLoggedIn === null) {
      return null;
    } else if (userData.isLoggedIn) {
      return  (
        <Stack direction={'row'} spacing={1} alignItems={'center'}> 
          <Hidden mdDown>
            <Tooltip title={'Your wallet'}>
              <Chip label={'€' + formattedWallet} icon={<Wallet style={{color: 'white'}}/>} sx={{ color: 'white'}} />
            </Tooltip>
          </Hidden>
          <Notifications />
          <UserIcon />
        </Stack>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            marginLeft: '10px',
            flexWrap: 'nowrap'
          }}
        >
          <AuthPopup itsALogin={true} />
          <AuthPopup itsALogin={false} />
        </Box>
      );
    }
};

  return (
    <AppBar sx={{
      position: 'sticky',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: {background},
      paddingInline: '10px',
      minHeight: '65px'}} className='preventSelect'>
        <Box sx={{
          display: 'flex',
          gap: '15px'}}>
            <Hidden mdUp><Hamburger isAdmin={userData.isAdmin} /></Hidden>
            <Button style={{color: 'white', fontSize: '25px'}} component={Link} to="/">
              <Hidden smDown><img src={process.env.PUBLIC_URL + "/images/banner.png"} alt="logo" height="40px" /></Hidden>
              <Hidden smUp><img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" height="40px" /></Hidden>
            </Button>
            <Hidden mdDown>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/discover">
                  <PeopleRoundedIcon sx={{marginRight: '3px'}}/>Discover
                </Button>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/races">
                  <StadiumRoundedIcon sx={{marginRight: '3px'}}/>Races
                </Button>
                {userData.isAdmin &&
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/admin">
                  <EngineeringRoundedIcon sx={{marginRight: '3px'}}/>Admin
                </Button>
                }
            </Hidden>
        </Box>
        <HeadsUpButton />
      {RightBoxContent()}
    </AppBar>
  );
}