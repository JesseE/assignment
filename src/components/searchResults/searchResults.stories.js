import React from 'react'

import { SearchResults } from './searchResults'

export default {
	title: 'SearchResults'
}

const Template = (args) => <SearchResults {...args}/>

export const Default = Template.bind({})

Default.args = {
	searchValue: 'trui'
}
