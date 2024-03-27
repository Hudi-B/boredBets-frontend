import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import './styles/Main.css';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { apiUrl } from './boredLocal';
import axios from 'axios';
import { logout, login } from './auth/authSlice';
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import Navbar from './Components/UI/Navbar'
import Footer from './Components/UI/Footer';
import Home from './Pages/Home';
import Discover from './Pages/Discover';
import MyPage from './Pages/MyPage';
import Races from './Pages/Races';
import Admin from './Pages/Admin';
import NotFound from './Pages/NotFound';
  import User from './Pages/SinglePages/User';
  import Jockey from './Pages/SinglePages/Jockey';
  import Horse from './Pages/SinglePages/Horse';


function App() {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //jwtDecode(Cookies.get('refreshToken'));
  // change to use refresh token

    const fetchData = async (userId) => {
      await axios.get(apiUrl+`User/GetByUserId?UserId=${userId}`)
          .then((response) => {
            const user = response.data;
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
  <Box sx={{
    width: '100vw',
    height: '100vh',
    padding: 'none',
    margin: 'none',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(2, 145, 138)',
    overflow: 'auto',
    overflowX: 'hidden',
  }}>
    <Router>
      <Navbar background={"rgba(50, 50, 50, 1)"} />
      <Routes>
        <Route exact path="/" element={<Home/>} />
            <Route path="*" element={<NotFound/>} />
        <Route exact path="/discover" element={<Discover/>} />
            <Route exact path="/user/:userId" element={<User/>} />
            <Route exact path="/jockey/:jockeyId" element={<Jockey/>} />
            <Route exact path="/horse/:horseId" element={<Horse/>} />
        <Route exact path="/races" element={<Races/>} />

        {userData.isLoggedIn && <Route exact path="/mypage" element={<MyPage/>} />}
        {userData.isAdmin && <Route exact path="/admin" element={<Admin/>} />}
      </Routes>
    </Router>
    <Footer />
  </Box>
  );
}

export default App;
