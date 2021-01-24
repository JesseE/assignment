import React from 'react'

import { SearchBar } from './searchBar'

export default {
	title: 'SearchBar'
}

const Template = (args) => <SearchBar {...args}/>

export const Default = Template.bind({})

Default.args = {
	label: 'Search for clothing'
}

export const Focused = Template.bind({})

Focused.args = {
  label: '',
}

export const Filled = Template.bind({})

Filled.args = {
  label: '',
}

export const Failed = Template.bind({})

Failed.args = {
  label: '',
}

