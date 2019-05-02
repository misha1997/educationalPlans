<template>
  <div class="header">
    <v-toolbar color="primary" dark app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="toggleMenu()"></v-toolbar-side-icon>
      <img class="header--logo" src='./../assets/images/logo.png' alt="logo"/>
      <v-toolbar-title>Навчальні плани</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon>person</v-icon>
        <v-spacer></v-spacer>
        <v-btn @click="logout" flat>Вихід</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>

  import AuthenticationService from '../services/AuthenticationService';
  import {mapMutations} from 'vuex';

	export default{
		methods: {
		  ...mapMutations({
        'toggleMenu': 'overlay/toggleMenu'
      }),
      logout () {
        this.$store.dispatch('setAccessToken', null)
        this.$store.dispatch('setRefreshToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'home'
        })
      }
    }
	}

</script>
