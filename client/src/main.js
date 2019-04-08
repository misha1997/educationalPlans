require('./bootstrap.js');

import Vue from 'vue'
import './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import App from './App'

import {mapMutations, mapGetters} from "vuex";

import store from './store';
import router from './routes';

require('./filters/dateFormat.js');

Vue.config.productionTip = false

sync(store, router)

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  computed: {
    ...mapGetters({
      'isSiteLoaded': 'overlay/isSiteLoaded'
    })
  },

  mounted(){
    this.siteLoaded();
  },

  methods: {
    ...mapMutations({
      'siteLoaded': 'overlay/siteLoaded'
    })
  }
}).$mount('#app')
