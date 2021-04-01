import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export const SearchResults = ({ searchResults=[], searchValue="", resetCurrentIndex=false}) => {
  const resultsList = useRef(null)
  const searchValueToLowerCase = searchValue.toLowerCase()

  const [ listItems, setListItems ] = useState(searchResults)
  let [ currentIndex, setCurrentIndex ] = useState(-1)

  const handleKeyBoardSupport = (event) => {
    if(event.key === 'ArrowUp') {
      if(currentIndex === 0) return
      setCurrentIndex(currentIndex--)
      setSelectedItemAsFocused()
    }

    if(event.key === 'ArrowDown' || event.key === 'Tab') {
      if(currentIndex === listItems.length - 1) return

      setCurrentIndex(currentIndex++)
      setSelectedItemAsFocused()
    }
  }

  const setSelectedItemAsFocused = () => {
    const addSelectedState = [...listItems].map(item => {
      const selected = (item.tabindex === currentIndex) ? true : false

      return {
        ...item,
        selected
      }
    })

    setListItems(addSelectedState)
  }

  useEffect(() => {
    const newSearchResults = [...searchResults].map((item,index) => {
      return {
        ...item,
        tabindex: index,
        selected: false
      }
    })

    setListItems(newSearchResults)

    if(resetCurrentIndex) setCurrentIndex(-1)

    document.addEventListener('keydown', event => handleKeyBoardSupport(event))

    return document.removeEventListener('keyDown', handleKeyBoardSupport)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCurrentIndex, searchResults])

  return (
    <>
      <div className={(listItems.length > 0) ? "search-results search-resutls--fade-in" : "search-results"}
          role="listbox" id="search-results" ref={resultsList}>
        {[...listItems].map((item, index) => {
          const name = item.searchterm

          return (
            <a href={`#${name.split(' ').join('')}`}
              key={`${name}--${index}`}
              aria-label={name}
              role="option"
              aria-selected={item.selected}
              className={`search-results-link ${item.selected && 'search-results-link--focused'}`}
            >
              {[...name].map((letter, index) =>
                searchValueToLowerCase.includes(letter)
                  ? <span className="search-results-letter search-results-letter--bold" key={`${letter}--${index}`}>{letter}</span>
                  : <span className="search-results-letter" key={`${letter}--${index}`}>{letter}</span>
              )}
              <span> ({item.nrResults})</span>
            </a>
          )
        })}
      </div>
    </>
	)
}

SearchResults.propTypes = {
  searchValue: PropTypes.string,
  searchResults: PropTypes.array,
}

export default SearchResults
