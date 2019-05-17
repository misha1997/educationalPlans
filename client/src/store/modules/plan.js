let state = {
  educationPlanId: 0,

  educationItems: [],

  currentItem: {}
};

let getters = {

  getEducationPlanId(state){
    return state.educationPlanId;
  },

  getEducationItems(state){
    return state.educationItems;
  },

  getCurrentItem(state){
    return state.currentItem;
  }
};

let mutations = {
  setEducationPlanId(state, id){
    state.educationPlanId = id;
  },

  setEducationItems(state, items){
    state.educationItems = items;
  },

  addEducationItem(state, item){
    state.educationItems.push(item);
  },

  updateEducationItem(state, educationItemId, data){
    let index = _.findIndex(state.educationItems, (item) => {
      return item.education_item_id == educationItemId;
    });

    if(index !== -1){
      state.educationItems.splice(index, 1, data);
    }
  },

  updateLearningData(state, {educationItemId, data}){
    let index = _.findIndex(state.educationItems, (item) => {
      return item.education_item_id == educationItemId;
    });

    if(index !== -1){
      _.assign(state.educationItems[index], {lectures: data.lectures, laboratories: data.laboratories });
    }
  },

  removeEducationItem(state, educationItemId){
    let index = _.findIndex(state.educationItems, (item) => {
      return item.education_item_id == educationItemId;
    });

    if(index !== -1){
      state.educationItems.splice(index, 1);
    }

  },

  setCurrentItem(state, data){
    state.currentItem = data;
  },

  resetCurrentItem(state){
    state.currentItem = {};
  },

  //Modal distribution

  updateDistributionOfHours(state,{educationItemId, data}){
    let index = state.educationItems.findIndex((item) => {
      return item.education_item_id === educationItemId;
    });

    if(index !== -1){
      state.educationItems[index].distribution_of_hours = data;
    }
  }
};

let actions = {
  createEducationItemSubCategory({state, commit, getters}, id){
    commit('setCurrentItem', {
      'education_plans_id': getters.getEducationPlanId, 
      'sub_category_id': id.sub_category_id, 
      'category_id': id.category_id,
      'cycles_id': id.cycles_id
    });
  },
  createEducationItemCategory({state, commit, getters}, id){
    commit('setCurrentItem', {
      'education_plans_id': getters.getEducationPlanId,
      'category_id': id.category_id,
      'cycles_id': id.cycles_id
    });
  },
  createEducationItemCycle({state, commit, getters}, cyclesId){
    commit('setCurrentItem', {
      'education_plans_id': getters.getEducationPlanId, 
      'cycles_id': cyclesId, 
    });
  },
}

module.exports = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

