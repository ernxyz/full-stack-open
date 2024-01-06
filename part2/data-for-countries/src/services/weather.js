import axios from "axios"

const API_KEY = import.meta.env.VITE_WEATHER_KEY
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`

const getWeather = (capitalCity) => {
  const request = axios.get(`${API_URL}&q=${capitalCity}&aqi=no`)
  // console.log(API_URL);
  return request.then(response => response.data)
}

export default { getWeather }
