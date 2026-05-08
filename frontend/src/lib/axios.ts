import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL +'api', // https://layerhire-api.up.railway.app/
  withCredentials: true,           // sends cookies with every request
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api