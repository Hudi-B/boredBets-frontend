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
import axios from 'axios';
import { apiUrl } from './boredLocal';


function App() {
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
  const userId = jwtDecode(Cookies.get('accessToken')).UserId;
  if (userId) {
    axios.get(apiUrl+`user/getByUserId?Id=${userId}`)
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
