import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token from localStorage
      localStorage.removeItem('token')

      // Redirect to the login page
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
