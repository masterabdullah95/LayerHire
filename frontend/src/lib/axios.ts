import axios from 'axios'

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL +'api',
  baseURL: import.meta.env.VITE_APP_URL +'api',
  withCredentials: true,           // sends cookies with every request
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api