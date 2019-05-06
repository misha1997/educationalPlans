import Api from './Api';

export default {
  register (credentials) {
    return Api().post('store', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}
