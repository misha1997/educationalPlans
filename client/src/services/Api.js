import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    baseURL: 'http://eptest.sumdu.edu.ua:8081/api/',
    headers: {
      Authorization: store.state.accessToken
    }
  })
}
