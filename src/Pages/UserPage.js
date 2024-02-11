import '../styles/userPage.css';
import { useState } from 'react';

export default function App() {
  const [whichOption, setWhichOption] = useState('Profile');

  const OptionToChangeTo = (event) => {
    if(event.target.innerText !== whichOption){
    setWhichOption(event.target.innerText);
    }
  }
  const renderOption = () => {
    switch(whichOption) {
      case 'Profile':
        return (
          <div>
            Profile
          </div>
        );
      case 'Preferences':
        return (
          <div>
            Preferences
          </div>
        );
      case 'OtherStuff':
        return (
          <div>
            OtherStuff
          </div>
        );
      case 'Privacy':
        return (
          <div>
            Privacy
          </div>
        );

      default:
        return <div>Error</div>;
    }
  }

  return (
    <div className="container">
        <div className="settings_container">
          {renderOption()}
        </div>
        <div className="settings_navigate_container">
        <button onClick={OptionToChangeTo} className="nav_link">
              Profile
          </button>
          <button onClick={OptionToChangeTo} className="nav_link">
              Preferences
          </button>
          <button onClick={OptionToChangeTo}className="nav_link">
            Privacy
          </button>            
          <button onClick={OptionToChangeTo} className="nav_link">
            OtherStuff
          </button>
        </div>
    </div>
  );
}
  