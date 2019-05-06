<template>
    <v-app>
        <content-component v-if="$store.state.isUserLoggedIn"></content-component>
        <login-component v-else></login-component>
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
