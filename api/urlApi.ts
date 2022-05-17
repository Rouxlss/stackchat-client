import axios from 'axios'

const urlApi = axios.create({
    baseURL: 'https://stackchat-server.herokuapp.com/api'
})

export default urlApi;