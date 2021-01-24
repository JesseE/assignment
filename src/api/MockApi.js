const getMockData = async(searchValue) => {
  const result = await fetch(`http://localhost:3000/search?searchterm=${searchValue}`)
    .then(res => res.json())
    .catch(err => err)

  return result
}

export {getMockData}
