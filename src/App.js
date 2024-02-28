import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import './styles/Main.css';

import Header from './Components/UI/Header'
import Home from './Pages/Home';
import Community from './Pages/Community';
import UserPage from './Pages/UserPage';
import Races from './Pages/Races';
import Admin from './Pages/Admin';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { apiUrl } from './boredLocal';
import axios from 'axios';
import { login } from './auth/authSlice';
import { useDispatch } from 'react-redux';



function App() {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //jwtDecode(Cookies.get('refreshToken'));
  // change to use refresh token

    useEffect(() => {
      const accessToken = Cookies.get('accessToken');
      var userId;
      if (accessToken) {
        userId = jwtDecode(accessToken).UserId;
      }
      if (userId) {
        axios.get(apiUrl+`user/getByUserId?Id=${userId}`)
        .then((response) => {
          const user = response.data[0];
          dispatch(login(user));
        })
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
    overflow: 'auto',
  }}>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="*" element={<Home/>} />
        <Route exact path="/community" element={<Community/>} />
        <Route exact path="/races" element={<Races/>} />
        {userData.isAdmin && <Route exact path="/admin" element={<Admin/>} />}
        <Route exact path="/mypage" element={<UserPage/>} />
      </Routes>
    </Router>
  </Box>
  );
}

export default App;
