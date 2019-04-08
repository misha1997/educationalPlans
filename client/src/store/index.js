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
    accessToken: null,
    refreshToken: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
      state.isUserLoggedIn = !!(accessToken)
    },
    setRefreshToken (state, refreshToken) {
      state.refreshToken = refreshToken
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setAccessToken ({commit}, accessToken) {
      commit('setAccessToken', accessToken)
    },
    setRefreshToken ({commit}, refreshToken) {
      commit('setAccessToken', refreshToken)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {
    plan,
    overlay,
    breadcrumbs
  },
});
