import AuthPopup from './AuthPopup';
import {Box, Button, AppBar, Chip, Stack, Hidden, Tooltip} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import {Link} from 'react-router-dom';
import Hamburger from './HamburgerMenu';
import { fontColor } from '../../boredLocal';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import numeral from 'numeral';
import Notifications from './notification';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Navbar( {background} ) {
  const userData = useSelector((state) => state.auth);

const RightBoxContent = () => {
    const formattedWallet = (userData.wallet >= 1000) ? numeral(userData.wallet).format('0.0a') : numeral(userData.wallet).format('0,0');
    if (userData.isLoggedIn === null) {
      return null;
    } else if (userData.isLoggedIn) {
      return  (
        <Stack direction={'row'} spacing={1} alignItems={'center'}> 
          <Hidden smDown>
            <Tooltip title={'Your wallet'}>
              <Chip label={'€' + formattedWallet} icon={<AccountBalanceWalletIcon style={{color: fontColor}}/>} sx={{ color: fontColor}} />
            </Tooltip>
          </Hidden>
          <Notifications sx={{color: fontColor}}/>
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
          alignItems: 'center',
          gap: '15px'}}>
            <Hidden mdUp><Hamburger isAdmin={userData.isAdmin} /></Hidden>
            <Button style={{color: fontColor, fontSize: '25px'}} component={Link} to="/">
              <Hidden smDown><img src={process.env.PUBLIC_URL + "/images/longbannerlight.png"} alt="logo" height="50px" /></Hidden>
              <Hidden smUp><img src={process.env.PUBLIC_URL + "/images/iconlight.png"} alt="logo" height="50px" /></Hidden>
            </Button>
            <Hidden mdDown>
              <Box sx={{color:fontColor, fontSize: "14px", paddingTop:0.75}}>
                <Button sx={{color:'inherit', fontSize: "inherit"}} component={Link} to="/discover">
                  <PeopleRoundedIcon sx={{marginRight: '3px'}}/>Discover
                </Button>
                <Button sx={{color:'inherit', fontSize: "inherit"}} component={Link} to="/races">
                  <StadiumRoundedIcon sx={{marginRight: '3px'}}/>Races
                </Button>
                {userData.isAdmin &&
                <Button sx={{color:'inherit', fontSize: "inherit"}} component={Link} to="/admin">
                  <EngineeringRoundedIcon sx={{marginRight: '3px'}}/>Admin
                </Button>
                }
              </Box>
            </Hidden>
        </Box>
      {RightBoxContent()}
    </AppBar>
  );
}