import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

let token = req.headers.authorization.split(' ')[1]
// Logout user
const logout = async() => {
  axios.get(API_URL + 'logout', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const authService = {
  register,
  logout,
  login,
}

export default authService