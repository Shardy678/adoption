import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://adoption-api-shardy678-nosweats-projects.vercel.app',
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
