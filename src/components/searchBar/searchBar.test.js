import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './searchBar'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchBar component', () => {
  const wrapper = shallow(<SearchBar  />)

  it('Render component without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SearchBar />, div)
  })

  it('Search input element has renderd', () => {
    expect(wrapper.find('.searchbar-input')).toHaveLength(1)
  })

  it('Search input has focus class', () => {
    wrapper.find('.searchbar-input').simulate('focus')
    expect(wrapper.find('.searchbar-input').hasClass('searchbar-input searchbar-input--focused')).toEqual(true)
  })

  it('Search input has text typed in', () => {
    const newTextValue = 'trui'

    wrapper.find('.searchbar-input').simulate('change', {target: { value: newTextValue }})

    expect(wrapper.find('.searchbar-input').props().value).toBe('trui')
    expect(wrapper.find('.searchbar-icon--cross')).toHaveLength(1)
  })

  it('Search input has been cleared', () => {
    const newTextValue = 'trui'

    wrapper.find('.searchbar-input').simulate('change', {target: { value: newTextValue }})
    wrapper.find('.searchbar-icon--cross').simulate('click')

    expect(wrapper.find('.searchbar-icon--cross')).toHaveLength(0)
    expect(wrapper.find('.searchbar-input').props().value).toBe('')
  })
})
