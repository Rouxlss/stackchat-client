import axios from 'axios'

const stackChatApi = axios.create({
    // baseURL: 'https://stackchat-server.herokuapp.com/api'
    baseURL: 'http://localhost:4000/api'
})

export default stackChatApi;