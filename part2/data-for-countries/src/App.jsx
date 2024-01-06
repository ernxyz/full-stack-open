import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import List from './components/List.jsx'
import Country from './components/Country.jsx'

import countryService from './services/countries.js'
import weatherService from './services/weather.js'

function App() {

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [onlyCountry, setOnlyCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    countryService
      .getAll()
      .then(response => {
        const names = response.map(country => country.name.common)

        setCountries(countries.concat(names))
      })

  }, [])

  const handleFilter = (e) => {
    const value = e.target.value
    
    setFilter(value)

    const filteredList = []

    if (value != '') {
      let regexp = new RegExp(`${value}`, 'i')

      countries.forEach(country => {
        if (regexp.test(country)){
          filteredList.push(country)
        }
      })
    }

    setFilteredCountries(filteredList)

    if (filteredList.length === 1 ){
      countryService
      .getInfo(filteredList[0])
      .then(response => {
        setOnlyCountry(response)

        weatherService
          .getWeather(response.capital)
          .then(response => {
            setWeather(response)
          })

      })
    } else if (onlyCountry != null) {
      setOnlyCountry(null)
    }
  }

  const showInfo = (name) => {

    countryService
      .getInfo(name)
      .then(response => {
        setOnlyCountry(response)
        setFilteredCountries([response])

        weatherService
        .getWeather(response.capital)
        .then(response => {
          setWeather(response)
        })
      })

  }

  const goBack = () => {
    setFilteredCountries([])
    setFilter('')
  }

  if(countries.length === 0){
    return null
  }

  return (
    <>
    <div>
      <Filter 
        filterValue={filter}
        handleFilter={handleFilter}
      /> 
    </div>
    <div>
      {
        filteredCountries.length === 1
        ? <Country countryObj={onlyCountry} goBack={goBack} weather={weather}/>
        : <List countriesToShow={filteredCountries} showInfo={showInfo} />
      }
    </div>
    </>
  )
}

export default App
