<template>
    <v-app>
        <login-component v-show="!$store.state.isUserLoggedIn"></login-component>
        <content-component v-show="$store.state.isUserLoggedIn"></content-component>
    </v-app>
</template>

<script>

import ContentComponent from './components/Content';
import LoginComponent from './components/Login/Login';

export default {
  name: 'app',
    components: {
        LoginComponent,
        ContentComponent
    },
}
</script>
