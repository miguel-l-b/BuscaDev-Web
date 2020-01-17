import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-devbusca.herokuapp.com'
})

export default api