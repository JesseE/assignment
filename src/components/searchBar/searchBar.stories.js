import React from 'react'
import { SearchBar } from './searchBar'

export default {
  component: SearchBar,
  title: 'SearchBar',
}

export const Default = () => <SearchBar label="Search for items" value="" />;

export const SuccessfullQuery = () => <SearchBar label="Search for items" value="trui" />;

export const InvalidQuery = () => <SearchBar label="Search for items" value="*" state="Not a valid input. Only alpha numeric values are accepted" />;

export const NoResultsQuery = () => <SearchBar label="Search for items" value="jesse" />;

export const FailedQuery = () => <SearchBar label="Search for items" state="Error occured while quering data" />;

