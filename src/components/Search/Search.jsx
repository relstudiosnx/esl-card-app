import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const Search = ({ onSearch, defaultSearchText }) => {

  const [searchText, setSearchText] = useState(defaultSearchText);

  const onSearchButtonClick = () => {
    if(defaultSearchText !== searchText) {
      onSearch(searchText);
    }
  };

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const onResetButtonClick = () => {
    if(defaultSearchText !== '') {
      setSearchText('');
      onSearch('');
    }
  };

  return (
    <div className="hsp-search-wrapper">
      <input type="text" onChange={onSearchTextChange} value={searchText} placeholder="Search by name..." />
      <div className="hsp-search-btn-wrapper">
        <button onClick={onResetButtonClick}>Reset</button>
        <button onClick={onSearchButtonClick}>Search</button>
      </div>

    </div>
  )
}


Search.propTypes = {
  defaultSearchText: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default Search;