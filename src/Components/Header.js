import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPopup from './SigninupPopup';
import SearchBar from './SearchBar';

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

  const changeLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className='header'>
      <Link to={`/`} className="nav_link">
        <h1 style={{color:"white"}}>BoredBets</h1>
      </Link>
      {needSearchBar ? <SearchBar/> : null}
      {/*<button style={{width: 100}} onClick={changeLogin}>loggedIn</button>*/}

      {
        onUserPage ? 
          isLoggedIn ? 
            <Link to={`/mypage`} className="nav_link pfpContainer">
            <img src={process.env.PUBLIC_URL + pfpImage} className='pfp rounded-circle' alt='why' />
            </Link>
            :
            <div className="login_register_containter">
              <LoginPopup login={true} trigger={<button>LOGIN</button>}/>
              <LoginPopup login={false} trigger={<button>REGISTER</button>}/>
            </div>
         : null
      }
    </div>
  );
}
