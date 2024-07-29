import axios from "axios";
const baseUrl = "/api/notes"

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
  // return request.then(response => response.data.concat(nonExisting))
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newNote => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newNote, config)
  return response.data
}

const update = (id, note) => {
  const request = axios.put(`${baseUrl}/${id}`, note)
  return request.then(response => response.data)
}

// const remove = (id) => {
//   return axios.delete(`${baseUrl}/${id}`)
// }

export default {getAll, create, update, setToken}