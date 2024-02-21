import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import './styles/Main.css';
import Header from './Components/Header'
import Home from './Pages/Home';
import Community from './Pages/Community';
import UserPage from './Pages/UserPage';
import Races from './Pages/Races';
import Admin from './Pages/Admin';



function App() {
  const [youAdmin , setYouAdmin] = React.useState(false);

  return (
  <div className='app'>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="*" element={<Home/>} />
        <Route exact path="/community" element={<Community/>} />
        <Route exact path="/races" element={<Races/>} />
        {youAdmin && <Route exact path="/admin" element={<Admin/>} />}
        <Route exact path="/mypage" element={<UserPage/>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
