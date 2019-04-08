const init_state = () => {
  return [{
    title: 'Головна',
    link: '/'
  }];
}

let state = {
  links: init_state()
}

let getters = {
  getBreadcrumbs(){
    return state.links;
  }
}

let mutations = {
  setBreadcrumbs(state, data){
    state.links.push(data);
  },
  resetBreadcrumbs(state){
    state.links = init_state();
  }
}

let actions = {
  init({state, commit}, data){
    commit('resetBreadcrumbs');
    commit('setBreadcrumbs', data);
  }
}

module.exports = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
