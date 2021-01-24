import React, {useEffect, useRef} from 'react'

export const SearchResults = ({ searchResults=[], searchValue=""}) => {
  const searchValueToLowerCase = searchValue.toLowerCase()
  const resultsList = useRef(null)
  let currentIndex = -1

  const handleKeyBoardSupport = (event) => {
    const listItems = resultsList.current.children;

    if(event.key === 'ArrowUp') {
      if(currentIndex === 0) return

      currentIndex--

      [...listItems].forEach(item => (item.tabIndex === currentIndex)
        ? (item.ariaSelected = true, item.focus())
        : item.ariaSelected = false)
    }

    if(event.key === 'ArrowDown') {
      if(currentIndex === -1) setFirstItemAsSelected()
      if(currentIndex === listItems.length) return

      currentIndex++

      [...listItems].forEach(item => (item.tabIndex === currentIndex)
        ? (item.ariaSelected = true, item.focus())
        : item.ariaSelected = false)
    }

    if(event.key === 'Enter') {
      [...listItems].forEach(item => (item.tabIndex === currentIndex) && item.children[0].click())
    }
  }

  const setFirstItemAsSelected = () => {
    const listItems = resultsList.current.children;

    [...listItems].map((item, index) => {
      if(index === 0) {
        item.classList.add('is-selected')
        item.ariaSelected = true
        item.tabIndex = 0
        return item.focus()
      } else {
        item.classList.remove('is-selected')
        item.ariaSelected = false
        return item.tabIndex = index
      }
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', event => handleKeyBoardSupport(event))

    return document.removeEventListener('keyDown', handleKeyBoardSupport)
  }, [])

  return (
    <div className="search-results" role="listbox" id="search-results" ref={resultsList}>
      {[...searchResults].map((item, index) => {
        const name = item.searchterm.toLowerCase()
        return (
          <a href={`#${name.split(' ').join('').toLowerCase()}`}
            key={`${item}--${index}`}
            aria-label={name}
            role="option"
            aria-selected={index === 0 ? true : false}
            id="selected-option"
            className="search-results-link"
          >
            {[...name].map((letter, index) =>
              (searchValueToLowerCase.includes(letter))
                ? <span className="search-results-letter search-results-letter--bold" key={`${letter}--${index}`}>{letter}</span>
                : <span className="search-results-letter" key={`${letter}--${index}`}>{letter}</span>
            )}
          </a>
        )
      })}
		</div>
	)
}

export default SearchResults
