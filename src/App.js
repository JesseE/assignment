import React from 'react';

import { SearchBar } from './components/searchBar/searchBar'

const App = () => {
  const props = {
    label: 'Search'
  }

  return (
    <>
      <SearchBar {...props} />
    </>
  )
}

export default App;
