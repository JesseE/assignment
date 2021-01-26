import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export const SearchResults = ({ searchResults=[], searchValue="", setItemAsSelected=false, resetCurrentIndex=false}) => {
  const searchValueToLowerCase = searchValue.toLowerCase()
  const resultsList = useRef(null)
  let currentIndex = -1
  const itemFocusedClass = 'search-results-link--focused'
  const ariaSelectdId= 'selected-option'

  const handleKeyBoardSupport = (event) => {
    const listItems = resultsList.current.children;

    if(event.key === 'ArrowUp') {
      if(currentIndex === 0) return

      currentIndex--
      setSelectedItemAsFocused(listItems)
    }

    if(event.key === 'ArrowDown') {
      if(currentIndex === -1) setFirstItemAsSelected()
      if(currentIndex === listItems.length - 1) return

      currentIndex++
      setSelectedItemAsFocused(listItems)
    }
  }

  const setSelectedItemAsFocused = (listItems) => {
    [...listItems].forEach(item => (item.tabIndex === currentIndex)
      ? (item.ariaSelected = true, item.focus(), item.id=ariaSelectdId, item.classList.add(itemFocusedClass))
      : (item.ariaSelected = false, item.id = "", item.classList.remove(itemFocusedClass)))
  }

  const setFirstItemAsSelected = () => {
    const listItems = resultsList.current.children;

    [...listItems].map((item, index) => {
      if(index === 0) {
        item.classList.add(itemFocusedClass)
        item.ariaSelected = true
        item.tabIndex = 0
        item.id=ariaSelectdId
        return item.focus()
      } else {
        item.classList.remove(itemFocusedClass)
        item.ariaSelected = false
        item.id = ""
        return item.tabIndex = index
      }
    })
  }

  useEffect(() => {
    if(setItemAsSelected) setFirstItemAsSelected()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if(resetCurrentIndex) currentIndex = -1

    document.addEventListener('keydown', event => handleKeyBoardSupport(event))

    return document.removeEventListener('keyDown', handleKeyBoardSupport)
  }, [handleKeyBoardSupport, setItemAsSelected, resetCurrentIndex])

  return (
    <>
    <div className={(searchResults.length > 0) ? "search-results search-resutls--fade-in" : "search-results"}
         role="listbox" id="search-results" ref={resultsList}>
      {[...searchResults].map((item, index) => {
        const name = item.searchterm.toLowerCase()

        return (
          <a href={`#${name.split(' ').join('')}`}
            key={`${name}--${index}`}
            aria-label={name}
            role="option"
            aria-selected={index === 0 ? true : false}
            id={index === 0 ? ariaSelectdId : ""}
            className="search-results-link"
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
