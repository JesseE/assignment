import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import SearchResults from '../searchResults/searchResults'
import { ReactComponent as SearchIcon} from '../../assets/icons/search.svg'
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg'
import { ReactComponent as ExclamationMark } from '../../assets/icons/exclamation-mark.svg'

export const SearchBar = ({ label, searchInputValue="" }) => {
  const noResultsState = 'No results found with: '
  const notValidState = 'Not a valid input. Only alpha numeric values are accepted'
  const defaultState = 'Idle'
  const errorState = 'Error occured while quering data'
  const isValidAlphaNumericStringExp = new RegExp(/^[\w\-\s]+$/)
  const host = 'http://localhost:3000'
  const searchEndpoint = '/search'

  const [ searchBarState, setSearchBarState ] = useState(defaultState)
	const [ searchValue, setSearchValue] = useState(searchInputValue)
  const [ searchResults, setSearchResults] = useState([])
  const [ inputIsFocused, setInputIsFocused ] = useState(false)
  const [ currentIndex, setCurrentIndex ] = useState(-1)

	useEffect(() => {

    if([...searchValue].length > 2) {
      fetchData(searchValue)
    } else {
      setSearchResults([])
    }

    if(searchValue === '') return setSearchBarState(defaultState)
	}, [searchValue])

  const fetchData = (searchValue) => {
		const results = fetch(`${host}${searchEndpoint}?searchterm=${searchValue}`)
			.then(res => res.json())
			.then(data => {
        const searchValueFound = data.suggestions.map(({searchterm}) => searchterm.toLowerCase())
        const checkIfTrue = item => item.includes(searchValue.toLowerCase())

        if (searchValueFound.some(checkIfTrue)) {
          const filterValues = data.suggestions
            .filter(({searchterm}) => searchterm.includes(searchValue))

          setSearchResults(filterValues)
          setSearchBarState(defaultState)
        } else {
          setSearchBarState(noResultsState)
        }

        if(searchValue === '') return setSearchBarState(noResultsState)
			})
			.catch(err => {
        setSearchBarState(errorState)
        return err
      })

		return results
  }

  const validateSearchValue = (value) => isValidAlphaNumericStringExp.test(value)
  const clearInput = () => {
    setSearchValue("")
    setCurrentIndex(-1)
  }
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
          value={searchValue}
          onFocus={() => setInputIsFocused(true)}
          onChange={event => validateSearchValue(event.target.value) || (event.target.value === "")
            ? setSearchValue(event.target.value)
            : setSearchBarState(notValidState)
          }
        />
        <button className={`searchbar-icon ${searchValue === '' ? 'is-hidden' : 'searchbar-icon--cross'} `}
          aria-label="Clear search value"
          onClick={() => clearInput()}>
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

      { searchBarState === notValidState && !searchResults.length > 0 &&
        <div id="selected-option" className="searchbar-message searchbar-message--not-valid">
          <ExclamationMark /><span>{searchBarState}</span>
        </div>
      }

      { searchResults && <SearchResults searchResults={searchResults} searchValue={searchValue} currentIndex={currentIndex}/> }
    </>
	)
}

SearchBar.propTypes = {
	label: PropTypes.string
}

export default SearchBar
