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
import Community from './Pages/Community';
import MyPage from './Pages/MyPage';
import Races from './Pages/Races';
import Admin from './Pages/Admin';
import NotFound from './Pages/NotFound';
import User from './Pages/User';
import Jockey from './Pages/Jockey';
import Horse from './Pages/Horse';


function App() {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //jwtDecode(Cookies.get('refreshToken'));
  // change to use refresh token

    useEffect(() => {
      if (Cookies.get('accessToken')) { 
        const accessToken = Cookies.get('accessToken');
        var userId;
        if (accessToken && accessToken!=='undefined') {
          userId = jwtDecode(accessToken).UserId;
        }
        if (userId) {
          axios.get(apiUrl+`User/GetByUserId?UserId=${userId}`)
          .then((response) => {
            const user = response.data[0];
            console.log(user);
            dispatch(login(user));
          })
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
  }}>
    <Router>
      <Navbar background={"rgba(50, 50, 50, 1)"} />
      <Routes>
        <Route exact path="/" element={<Home/>} />
            <Route path="*" element={<NotFound/>} />
        <Route exact path="/community" element={<Community/>} />
            <Route exact path="/user/:userId" element={<User/>} />
            <Route exact path="/jockey/:jockeyId" element={<Jockey/>} />
            <Route exact path="/horse/:horseId" element={<Horse/>} />
        <Route exact path="/races" element={<Races/>} />
        <Route exact path="/mypage/:userId" element={<MyPage/>} />

        {userData.isAdmin && <Route exact path="/admin" element={<Admin/>} />}
      </Routes>
    </Router>
    <Footer />
  </Box>
  );
}

export default App;
