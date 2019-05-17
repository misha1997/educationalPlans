<template>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Авторизація</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field prepend-icon="person" name="email" v-model="email" :rules="loginEmailRules" label="E-mail" type="text" required></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" v-model="password" :rules="passwordRules" label="Пароль" type="password" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-alert v-if="error" :value="true" color="error" icon="warning" outline>
                  {{ error }}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" :disabled="!valid" color="primary" @click="login">Увійти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
import validation from '../../mixins/validation';

export default {

  mixins: [validation],

  data () {
    return {
      valid: true,
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user.user_id)
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        this.error = "Помилка!"
      }
    }
  }
}
</script>
