import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/api/',
    headers: {
      Authorization: store.state.accessToken
    }
  })
}
