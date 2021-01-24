import React from 'react'

import { SearchBar } from './searchBar'

export default {
  component: SearchBar,
  title: 'SearchBar',
}

export const Default = () => <SearchBar label="Search for items" searchInputValue="" />;

export const SuccessfullQuery = () => <SearchBar label="Search for items" searchInputValue="trui" />;

export const InvalidQuery = () => <SearchBar label="Search for items" searchInputValue="*#(*%&#" />;

export const NoResultsQuery = () => <SearchBar label="Search for items" searchInputValue="jesse" />;

