import axios from 'axios'

const urlForAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const urlForOne = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {

  const request = axios.get(urlForAll)
  
  
  return request.then(response => response.data)

}

const getInfo = (countryName) => {
  const request = axios.get(`${urlForOne}/${countryName}`)

  return request.then(response => response.data)
}

export default { getAll, getInfo }