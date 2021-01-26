import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import SearchResults from '../searchResults/searchResults'
import { ReactComponent as SearchIcon} from '../../assets/icons/search.svg'
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg'
import { ReactComponent as ExclamationMark } from '../../assets/icons/exclamation-mark.svg'
import { getMockData } from '../../api/MockApi';

export const SearchBar = ({ label, value="", state="" }) => {
  const noResultsState = 'No results found with: '
  const notValidState = 'Not a valid input. Only alpha numeric values are accepted'
  const defaultState = ''
  const errorState = 'Error occured while quering data'
  const isValidAlphaNumericStringExp = new RegExp(/^[\w\-\s]+$/) //only accept alpha numeric values
  const host = 'http://localhost:3000'
  const searchEndpoint = '/search'
  const minLengthSearchValue = 2
  const debounceTimeAmount = 200
  const [ searchBarState, setSearchBarState ] = useState(state)
	const [ searchValue, setSearchValue] = useState(value)
  const [ searchResults, setSearchResults] = useState([])
  const [ inputIsFocused, setInputIsFocused ] = useState(false)
  const [ resetIndex, setResetIndex ] = useState(false)

  const validateSearchValue = (value) => isValidAlphaNumericStringExp.test(value)

  const fetchData = debounce(
    async () => {
      if(validateSearchValue(searchValue)) {
        const results = await getMockData(searchValue, host, searchEndpoint)

        if(results === undefined) return setSearchBarState(errorState)

        const searchValueFound = results.suggestions.map(({searchterm}) => searchterm.toLowerCase())
        const checkIfTrue = item => item.includes(searchValue.toLowerCase())

        if (searchValueFound.some(checkIfTrue)) {
          const filterValues = results.suggestions
            .filter(({ searchterm }) => searchterm.includes(searchValue))

          setSearchResults(filterValues)
          setSearchBarState(defaultState)
        } else {
          setSearchBarState(noResultsState)
        }

        if(searchValue === '') return setSearchBarState(noResultsState)
      } else {
        setSearchBarState(notValidState)
      }
    },
    debounceTimeAmount
  )

  const clearInput = () => {
    setSearchValue("")
    setResetIndex(true)
  }

  useEffect(() => {
    ([...searchValue].length >= minLengthSearchValue)
      ? fetchData()
      : setSearchResults([])

    setResetIndex(false)
    if(searchValue === '') return setSearchBarState(defaultState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue])

	return (
    <>
      <form className="searchbar" aria-haspopup="listbox" aria-expanded={searchResults.length > 0 ? "true": "false"} role="combobox"
        aria-owns="search-results" aria-controls="search-results" onSubmit={(event) => event.preventDefault()} action="/">
        <input className={ (inputIsFocused) ? "searchbar-input searchbar-input--focused" : "searchbar-input"}
          type="search"
          placeholder={label}
          aria-label="search-results"
          aria-autocomplete="list"
          aria-activedescendant="selected-option"
          value={searchValue.toLowerCase()}
          onFocus={() => setInputIsFocused(true)}
          onChange={event => validateSearchValue(event.target.value) || (event.target.value === "")
            ? setSearchValue(event.target.value)
            : setSearchBarState(notValidState)
          }
        />
        <button className={`searchbar-icon ${searchValue === '' ? 'is-hidden' : 'searchbar-icon--cross'} `}
          aria-label="Clear search value"
          onClick={clearInput}>
          <CrossIcon />
        </button>
        <div className="searchbar-icon">
          <SearchIcon />
        </div>
      </form>

      { searchBarState === noResultsState && !searchResults.length > 0 &&
        <div id="selected-option" className="searchbar-message searchbar-message--no-results">
          <ExclamationMark /><span>{searchBarState}{searchValue}. Try searching: trui</span>
        </div>
      }

      { searchBarState === notValidState && !searchResults.length > 0  &&
        <div id="selected-option" className="searchbar-message searchbar-message--not-valid">
          <ExclamationMark /><span>{searchBarState}</span>
        </div>
      }

      { searchBarState === errorState &&
        <div id="selected-option" className="searchbar-message searchbar-message--not-valid">
          <ExclamationMark /> <span>{searchBarState}</span>
        </div>
      }

      { errorState === state &&
        <div id="selected-option" className="searchbar-message searchbar-message--not-valid">
          <ExclamationMark /><span>{state}</span>
        </div>
      }

      { searchResults && <SearchResults searchResults={searchResults} searchValue={searchValue} resetIndex={resetIndex} /> }
    </>
	)
}

SearchBar.propTypes = {
  label: PropTypes.string,
  state: PropTypes.string,
  value: PropTypes.string
}

export default SearchBar
