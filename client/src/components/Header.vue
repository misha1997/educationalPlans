<template>
  <div class="header">
    <v-toolbar color="primary" dark app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="toggleMenu()"></v-toolbar-side-icon>
      <img class="header--logo" src='./../assets/images/logo.png' alt="logo"/>
      <v-toolbar-title>Навчальні плани</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <v-btn @click="viewProfile('/profile/'+$store.state.user)" flat><v-icon title="Перейти на персональну сторінку">person</v-icon></v-btn>
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
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'home'
        })
      },
      viewProfile(link){
        this.$router.push(link);
      }
    }
	}

</script>
