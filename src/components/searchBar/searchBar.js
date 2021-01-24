import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import SearchResults from '../searchResults/searchResults'
import { ReactComponent as SearchIcon} from '../../assets/icons/search.svg'
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg'

export const SearchBar = ({ label="" }) => {
  const noResultsState = 'No results found with: '
  const notValidState = 'not valid input only alpha numeric values are accepted'
  const defaultState = 'idle'
  const errorState = 'Error occured while quering data'
  const isValidAlphaNumericStringExp = new RegExp(/^[\w\-\s]+$/)
  const host = 'http://localhost:3000'
  const searchEndpoint = '/search'
  const clearInputEl = useRef(null)
  const searchInputEl = useRef(null)

  const [ searchBarState, setSearchBarState ] = useState(defaultState)
	const [ searchValue, setSearchValue] = useState("")
	const [ searchResults, setSearchResults] = useState([])

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
          setSearchResults(data.suggestions)
          setSearchBarState(defaultState)
        } else {
          setSearchBarState(noResultsState)
        }

        if(searchValue === '') {
          setSearchBarState(noResultsState)
        }
			})
			.catch(err => {
        setSearchBarState(errorState)
        return err
      })

		return results
  }

  const validateSearchValue = (value) => isValidAlphaNumericStringExp.test(value)

  const onSubmit = (event) => {
    event.preventDefault()
  }

	return (
    <>
      <form className="searchbar" aria-haspopup="listbox" aria-expanded={searchResults.length > 0 ? "true": false} role="combobox"
        aria-owns="search-results" aria-controls="search-results" onSubmit={onSubmit} action="/">
        <input className="searchbar-input"
          type="search"
          placeholder={label}
          aria-label="search-results"
          aria-autocomplete="list"
          aria-activedescendant="selected-option"
          value={searchValue}
          ref={searchInputEl}
          onChange={event => validateSearchValue(event.target.value) || (event.target.value === "")
            ? setSearchValue(event.target.value)
            : setSearchBarState(notValidState)
          }
        />
        <button aria-label="Clear search value" className={`searchbar-icon ${searchValue === '' ? 'is-hidden' : 'searchbar-icon--cross'} `} onClick={() => setSearchValue("")}>
          <CrossIcon />
        </button>
        <div className="searchbar-icon">
          <SearchIcon />
        </div>
      </form>
      { searchBarState === noResultsState &&
        <div className="searchbar-message">
            <span>{searchBarState}{searchValue}</span>
        </div>
      }
      { searchBarState === notValidState &&
        <div className="searchbar-message">
            <span>{searchBarState}</span>
        </div>
      }

      { searchResults && <SearchResults searchResults={searchResults} searchValue={searchValue}/> }
    </>
	)
}

SearchBar.propTypes = {
	label: PropTypes.string.isRequired
}

export default SearchBar
