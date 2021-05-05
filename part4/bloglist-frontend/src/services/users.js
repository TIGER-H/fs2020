import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a, b) => b.blogs.length - a.blogs.length)
}
export default { getUsers }
