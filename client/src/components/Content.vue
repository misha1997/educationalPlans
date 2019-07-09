<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex>
          <div>
            <nav-component></nav-component>
            <header-component></header-component>
          </div>
          <div>
            <!-- <v-progress-linear :indeterminate="isLoading"></v-progress-linear> -->
          </div>
          <div>
            <router-view></router-view>
            <footer-component></footer-component>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import HeaderComponent from '../components/Header';
  import NavComponent from '../components/Nav';
  import FooterComponent from '../components/Footer';
  import {mapGetters} from 'vuex';

	export default{
    components: {
      HeaderComponent,
      NavComponent,
      FooterComponent
    },
    computed: {
      ...mapGetters({
        'breadcrumbs': 'breadcrumbs/getBreadcrumbs',
        'isLoading': 'overlay/isLoading'
      })
    }
  }
</script>
