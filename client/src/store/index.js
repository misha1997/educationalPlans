import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import plan from './modules/plan';
import overlay from './modules/overlay';
import breadcrumbs from './modules/breadcrumbs';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    role: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    setRole (state, role) {
      state.role = role
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setRole ({commit}, role) {
      commit('setRole', role)
    }
  },
  modules: {
    plan,
    overlay,
    breadcrumbs
  },
});
