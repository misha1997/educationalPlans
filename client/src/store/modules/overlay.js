let state = {
  menuEnabled: true,
  loading: false,
  siteLoading: true
}

let getters = {
  isMenuEnabled: state => state.menuEnabled,
  isLoading: state => state.loading,
  isSiteLoaded: state => state.siteLoading
}

let mutations = {
  toggleMenu(state){
    state.menuEnabled = !state.menuEnabled;
  },
  enableLoading(state){
    state.loading = true;
  },
  disableLoading(state){
    state.loading = false;
  },
  siteLoaded(state){
    state.siteLoading = false;
  }
}

module.exports = {
  namespaced: true,
  state,
  getters,
  mutations
}
