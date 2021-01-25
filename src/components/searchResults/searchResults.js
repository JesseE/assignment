import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export const SearchResults = ({ searchResults=[], searchValue="", setItemAsSelected=false, resetCurrentIndex=false}) => {
  const searchValueToLowerCase = searchValue.toLowerCase()
  const resultsList = useRef(null)
  let currentIndex = -1

  const handleKeyBoardSupport = (event) => {
    const listItems = resultsList.current.children;

    if(event.key === 'ArrowUp') {
      if(currentIndex === 0) return

      currentIndex--

      [...listItems].forEach(item => (item.tabIndex === currentIndex)
        ? (item.ariaSelected = true, item.focus(), item.id="selected-option", item.classList.add('search-results-link--focused'))
        : (item.ariaSelected = false, item.id = "", item.classList.remove('search-results-link--focused')))
    }

    if(event.key === 'ArrowDown') {
      if(currentIndex === -1) setFirstItemAsSelected()
      if(currentIndex === listItems.length - 1) return

      currentIndex++

      [...listItems].forEach(item => (item.tabIndex === currentIndex)
        ? (item.ariaSelected = true, item.focus(), item.id="selected-option", item.classList.add('search-results-link--focused'))
        : (item.ariaSelected = false, item.id = "", item.classList.remove('search-results-link--focused')))
    }

    if(event.key === 'Enter') {
      [...listItems].forEach(item => (item.tabIndex === currentIndex) && item.children[0].click())
    }
  }


  const setFirstItemAsSelected = () => {
    const listItems = resultsList.current.children;

    [...listItems].map((item, index) => {
      if(index === 0) {
        item.classList.add('search-results-link--focused')
        item.ariaSelected = true
        item.tabIndex = 0
        item.id="selected-option"
        return item.focus()
      } else {
        item.classList.remove('search-results-link--focused')
        item.ariaSelected = false
        item.id = ""
        return item.tabIndex = index
      }
    })
  }

  useEffect(() => {
    if(setItemAsSelected) setFirstItemAsSelected()
    if(resetCurrentIndex) currentIndex = -1

    document.addEventListener('keydown', event => handleKeyBoardSupport(event))

    return document.removeEventListener('keyDown', handleKeyBoardSupport)
  }, [handleKeyBoardSupport, setItemAsSelected, resetCurrentIndex])

  return (
    <>
    <div className={(searchResults.length > 0) ? "search-results search-resutls--fade-in" : "search-results"} role="listbox" id="search-results" ref={resultsList}>
      {[...searchResults].map((item, index) => {
        const name = item.searchterm.toLowerCase()
        return (
          <a href={`#${name.split(' ').join('')}`}
            key={`${item}--${index}`}
            aria-label={name}
            role="option"
            aria-selected={index === 0 ? true : false}
            id={index === 0 ? "selected-option" : ""}
            className={"search-results-link"}
          >
            {[...name].map((letter, index) =>
              (searchValueToLowerCase.includes(letter))
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
