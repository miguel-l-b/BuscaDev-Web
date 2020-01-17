import axios from 'axios'

const api = axios.create({
    baseURL: 'https://devbuscabackend.herokuapp.com/'
})

export default api