const getMockData = async(searchValue="", host, searchEndpoint) => {
  const results = await fetch(`${host}${searchEndpoint}?searchterm=${searchValue}`)
    .then(res => res.json())
    .catch(err => console.error(err))

  return results
}

export {getMockData}
