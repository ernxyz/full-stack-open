import React from "react"

const Country = ({ countryObj, goBack, weather }) => {
  
  if (!countryObj || !weather){
    return null
  }

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <h2>{countryObj.name.common}</h2>
      <p>Capital: {countryObj.capital}</p>
      <p>Area: {countryObj.area}</p>
      <h3>Languages:</h3>
      <ul>
        {
          Object.entries(countryObj.languages).map(([key, language]) => (
            <li key={key}>
              {language}
            </li>
          ))
        }
      </ul>
      <div>
        {
          <img
            src={countryObj.flags.svg} 
            width={160}
            height={100}
          />
        }
      </div>
      <div>
        <h3>Weather in {countryObj.capital}</h3>
        <p>temperature: {weather.current.temp_c} celsius </p>
        <p>wind: {weather.current.wind_kph} Km/h </p>
        <p>humidity: {weather.current.humidity}% </p>
        <p>condition: {weather.current.condition.text}</p>
        <div>
          <img
            src={weather.current.condition.icon}
          />
        </div>
      </div>
    </div>
  )
}

export default Country