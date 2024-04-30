import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import './styles/Main.css';
import { useEffect, lazy, Suspense } from 'react';
import { jwtDecode } from 'jwt-decode';
import { apiUrl } from './boredLocal';
import axios from 'axios';
import { logout, login } from './auth/authSlice';
import { useDispatch } from 'react-redux';

import Navbar from './Components/UI/Navbar';
import Footer from './Components/UI/Footer';
import Home from './Pages/Home';
import Verification from './Pages/Verification';

const Discover = lazy(() => import('./Pages/Discover'));
const MyPage = lazy(() => import('./Pages/MyPage'));
const Races = lazy(() => import('./Pages/Races'));
const SingleRace = lazy(() => import('./Pages/Races/SingleRace'));
const Admin = lazy(() => import('./Pages/Admin'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const User = lazy(() => import('./Pages/Individuals/User'));
const Jockey = lazy(() => import('./Pages/Individuals/Jockey'));
const Horse = lazy(() => import('./Pages/Individuals/Horse'));

const theme = createTheme({
  typography: {
    allVariants: {
      color: "white"
    },
  },
  palette: {
    primary: {
      main: 'rgba(75, 75, 75, 1)',
      dark: 'rgba(200, 200, 200, 0.3)',
    },
    secondary: {
      main: 'rgba(200, 200, 200, 0.8)',
      dark: 'rgba(200, 200, 200, 0.3)',
    },
  },
});

export default function App() {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  //jwtDecode(Cookies.get('refreshToken'));
  // change to use refresh token

    const fetchData = async (userId) => {
      await axios.get(apiUrl+`User/GetByUserId?UserId=${userId}`)
          .then((response) => {
            const user = response.data;
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            dispatch(login(user));
          })
    }

    useEffect(() => {
      if (Cookies.get('accessToken')) {
        const accessToken = Cookies.get('accessToken');
        var userId;
        if (accessToken && accessToken!=='undefined') {
          userId = jwtDecode(accessToken).UserId;
        }
        if (userId) {
          fetchData(userId);
        }
      }else {
        dispatch(logout());
      }
    }, []);


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        width: '100vw',
        height: '100vh',
        padding: 'none',
        margin: 'none',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(63, 85, 115)',
        overflow: 'auto',
        overflowX: 'hidden',
      }}>
        <Box>
          <Router>
            <Navbar background={"rgba(50, 50, 50, 1)"} />
            <Suspense fallback={
                    <Box sx={{ display: 'flex' ,width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress sx={{color: 'black', height: '100px', width: '100px'}}/>
                    </Box>}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="*" element={<NotFound lookedFor={'page'} />} />
                  <Route exact path="/discover" element={<Discover />} />
                  <Route exact path="/user/:userId" element={<User />} />
                  <Route exact path="/jockey/:jockeyId" element={<Jockey />} />
                  <Route exact path="/horse/:horseId" element={<Horse />} />
                  <Route exact path="/races" element={<Races />} />
                  <Route exact path="/race/:raceId" element={<SingleRace />} />
                  <Route exact path="/verification/:verificationCode/:userId" element={<Verification />} />
                  {userData.isLoggedIn && <Route exact path="/mypage" element={<MyPage />} />}
                  {userData.isAdmin && <Route exact path="/admin" element={<Admin />} />}
                </Routes>
              </Suspense>
              <Footer />
          </Router>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}
