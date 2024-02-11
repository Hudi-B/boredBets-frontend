import '../styles/SearchBar.css';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



export default function SearchBar() {
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('any');

const Search = () => {
    if (searchText !== '') {
        setActive(false);
        alert(`You have succesfully searched for ${searchText} in ${category} category`);
        setSearchText('');
    }else{
        alert('Please enter a search promt');
    }

}

  if (!active) {
    return (
        <div className="searchbarBox" onClick={() => setActive(true)}>
            Discover
        </div>
      );
  }else{
    return (
        <div className="searchbarBox active">   
            {/*also need an icon here, or the end of the line*/}
            <select>
            <option value="any" onClick={(e) => setCategory(e.target.value)}>Default</option>
                <option value="people" onClick={(e) => setCategory(e.target.value)}>People</option>
                <option value="jockey" onClick={(e) => setCategory(e.target.value)}>Jockey</option>
                <option value="horse" onClick={(e) => setCategory(e.target.value)}>Horse</option>
            </select>
            <input 
                type='text' 
                placeholder="Search" 
                onKeyUp={(e) => {
                    setSearchText(e.target.value);
                    if (e.key === 'Enter') {
                        Search();
                    }
                }}
            />
            <FontAwesomeIcon className='searchIcon' icon={faMagnifyingGlass} onClick={() => Search()} />
        </div>
      );
  }


  }
  