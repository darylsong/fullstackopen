import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
  
const getUser = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}
  
export default { getUsers, getUser }