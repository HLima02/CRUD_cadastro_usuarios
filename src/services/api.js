import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-cadastro-de-usuario.onrender.com/'
})
