import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPopup from './SigninupPopup';
import SearchBar from './SearchBar';
import '../styles/Header.css';

import Button from '@mui/material/Button';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onUserPage, setOnUserPage] = useState(true);
  const [needSearchBar, setNeedSearchBar] = useState(false);
  const [pfpImage, setPfpImage] = useState('./stock_pfp.png');

const location = useLocation();

useEffect(() => {
  let url = location.pathname;
  if (url.includes("login") || url.includes("register") || url.includes("mypage")) {
    setOnUserPage(false);
  } else {
    setOnUserPage(true);
  }

  if (url.includes("community") || url.includes("races")) {
    setNeedSearchBar(true);
  } else {
    setNeedSearchBar(false);
  }
}, [location.pathname]);

  return (
    <div className='header'>
      <div className='left'>
        <Link to={`/`} className="nav_link">
          <h1>BoredBets</h1>
        </Link>
        <Link to={`/community`} className="nav_link">
          <p>Community</p>
        </Link>
        <Link to={`/races`} className="nav_link">
          <p>Races</p>
        </Link>
        <Link to={`/admin`} className="nav_link">
          <p>AdminPage</p>
        </Link>
      </div>

      {
        onUserPage ? 
          isLoggedIn ? 
            <Link to={`/mypage`} className="nav_link pfpContainer">
            <img src={process.env.PUBLIC_URL + pfpImage} className='pfp rounded-circle' alt='why' />
            </Link>
            :
            <div className="login_register_containter">
              <LoginPopup login={true} trigger={<button className="login">LOGIN</button>}/>
              <LoginPopup login={false} trigger={<button className="register" >REGISTER</button>}/>
            </div>
         : null
      }
    </div>
  );
}
