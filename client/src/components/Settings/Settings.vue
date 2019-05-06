<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Налаштування</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
        <v-subheader>
          API інтеграція за ASU
        </v-subheader>
        <v-btn color="primary" @click="integrateData">Інтегрувати з ASU</v-btn>
        <v-divider></v-divider>
      </v-list>
    </v-card>
  </div>
</template>

<script>

  import {mapMutations} from "vuex";

  import Api from '../../services/Api';
  import {successAlert, errorAlert} from '../../services/Swal';

  export default{
    methods: {
      ...mapMutations({
        'enableLoading': 'overlay/enableLoading',
        'disableLoading': 'overlay/disableLoading'
      }),

      integrateData(){
        this.enableLoading();
        Api().post('asu')
          .then((response) => {
            //successAlert(response);
          })
          .catch((err)=>{
            //errorAlert(err);
          })
          .then(()=>{
            this.disableLoading();
          })
      }
    }
  }
</script>
