<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex>
          <div>

        <!--Nav Component -->
        <nav-component></nav-component>

        <!--Header Component -->
        <header-component></header-component>

            <v-breadcrumbs :items="breadcrumbs">
              <template slot="item" slot-scope="props">
                <a :href="props.item.link">{{ props.item.title.toUpperCase() }}</a>
              </template>
            </v-breadcrumbs>
          </div>
          <div>
            <v-progress-linear :indeterminate="isLoading"></v-progress-linear>
          </div>
          <div>
            <router-view></router-view>

        <!--Footer Component -->
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
