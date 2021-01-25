import React from 'react'
import ReactDOM from 'react-dom'
import SearchResults from './searchResults'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getMockData } from '../../api/MockApi';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(testMockData)
  })
)

const testMockData = [
  { searchterm: 'heren truien', nrResults: 1100 },
  { searchterm: 'dames truien', nrResults: 1501 },
  { searchterm: 'kenzo trui', nrResults: 62 },
  { searchterm: 'kenzo trui dames', nrResults: 21 },
  { searchterm: 'kenzo trui heren', nrResults: 12 },
  { searchterm: 'armani truien', nrResults: 39 },
  { searchterm: 'daily paper trui', nrResults: 2 },
  { searchterm: 'calvin klein trui', nrResults: 54 },
  { searchterm: 'calvin klein trui heren rood', nrResults: 40 },
  { searchterm: 'calvin klein trui heren blauw', nrResults: 50 },
  { searchterm: 'calvin klein trui heren oranje', nrResults: 42 }
]

describe('SearchResults component', () => {
  const wrapper = shallow(<SearchResults />)

  it('Render component without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SearchResults />, div)
  })

  it('SearchResults element has rendered', () => {
    expect(wrapper.find('.search-results')).toHaveLength(1)
  })

  it('Fetches mockdata from the api succesfully', async () => {
    const searchValue = "trui"
    const host = 'http://localhost:3000'
    const searchEndpoint = '/search'
    const getData = await getMockData(searchValue,host,searchEndpoint)

    expect(getData).toEqual(testMockData)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/search?searchterm=trui')
  })

  it('Search results to have children when data is passed in', () => {
    const wrapper = mount(<SearchResults searchResults={testMockData} />)
    expect(wrapper.find('.search-results').children()).toHaveLength(testMockData.length);
  })
})
