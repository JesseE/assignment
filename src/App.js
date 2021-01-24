import React, { Component } from 'react';

import { SearchBar } from './components/searchBar/searchBar'

class App extends Component {
  render() {
    return (
      <>
        <SearchBar label="Search for clothing" />
      </>
    );
  }
}

export default App;
