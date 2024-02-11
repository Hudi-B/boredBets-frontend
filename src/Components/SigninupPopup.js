
import '../styles/Popup.css';

import React, { useState } from 'react';
import Popup from 'reactjs-popup';

export default function PostButton( {login, trigger} ) {

    
  const [loggingIn, setLoggingIn] = useState(login);
  
  const handleSubmit = async (e) => {
  e.preventDefault();
 alert('submitted');
 window.location.reload();
}

  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className='bigBox' onClick={close}>
          <div className='inputBox' onClick={(event) => event.stopPropagation()} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='logo'>boreDom</div>
            <div className='switchButtons'>
              <button className={loggingIn ? 'active' : ''} onClick={() => setLoggingIn(true)}>Sign in</button>
              <button className={loggingIn ? '' : 'active'} onClick={() => setLoggingIn(false)}>Sign up</button>
            </div>
            <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Email' />
              <div className='passwordContainer'>
                <input type='password' placeholder={loggingIn ? 'Password' : 'Create password'} />
                <div type='submit'>GO</div>
              </div>
              {loggingIn ? 
                <div className='operation_container'>
                    <div><input type='checkbox' key='rememberMeCheckbox'/>Remember me</div>
                    <button>Forgot password?</button>
                </div>
                : null
                }
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
}
