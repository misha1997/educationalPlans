import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    baseURL: '/api/',
    headers: {
      Authorization: store.state.accessToken
    }
  })
}
