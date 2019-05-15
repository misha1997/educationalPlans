<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">Норми контролю начального плану</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md class="py-0">
              <table class="table table-bordered text-center">
                <tr>
                  <td colspan="16">Розподіл годин на тиждень за курсами, семестрами і модульними атестаційними циклами </td>
                </tr>
                <tr>
                  <td colspan="4" v-for="index in 4">{{ index }} курс</td>
                </tr>
                <tr>
                  <td colspan="16">Семестри</td>
                </tr>
                <tr>
                  <td colspan="2" v-for="index in 8">{{ index }}</td>
                </tr>
                <tr>
                  <td colspan="16">Кількість годин на тиждень</td>
                </tr>
                <tr>
                  <td v-for="item in data">
                    <v-text-field v-model="item.value" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість екзаменів</td>
                </tr>
                <tr>
                  <td v-for="item in data">
                    <v-text-field v-model="item.value" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість курсових робіт</td>
                </tr>
                <tr>
                  <td v-for="item in data">
                    <v-text-field v-model="item.value" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>
              </table>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Відміна</v-btn>
            <v-btn color="blue darken-1" type="submit" flat>Зберегти</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  import {EventBus} from "../../../event-bus";
  import Api from '../../../services/Api';
  import Swal from '../../../services/Swal';

  const ROMAN_NUMBERS = ["I", "II", "III", "IV"]

  export default {
    data(){
      return {
        dialog: false,
        data: []
      }
    },

    created(){

      this.initData();

      EventBus.$on('toggle-plan-controls-form', () => {
        this.dialog = !this.dialog;
      });
    },
    methods:{
      initData(){
        let counter = 0;
        _.forEach(new Array(16), (item, index) => {
          this.data.push({
            module_number: index+1,
            label: ROMAN_NUMBERS[counter],
            value: ''
          });
          counter = (counter !== 3) ? counter + 1 : 0;
        });

      },

      close(){
        this.dialog = false;
      },

      save(){
        console.log("save")
      }
    },

    watch:{
      dialog: function(){
        if(this.dialog === false){
          this.data = [];
          this.initData();
        }
      }
    }
  }
</script>
