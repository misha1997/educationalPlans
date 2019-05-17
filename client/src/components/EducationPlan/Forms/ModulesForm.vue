<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-alert
              :value="validator"
              color="error"
              icon="new_releases"
            >
              Кількість годин повинна бути в діапазоні від {{ Math.ceil((credits*30)/32) }} до {{ Math.floor((credits*30)/8) }}
            </v-alert>
            <v-container grid-list-md class="py-0">
              <table class="table table-bordered text-center">
                <tr>
                  <td colspan="16">Розподіл годин на тиждень за курсами, семестрами і модульними атестаційними циклами</td>
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
                  <td colspan="16">Модульні атестаційні цикли</td>
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
            <v-btn color="blue darken-1" type="submit" flat v-if="!validator">Зберегти</v-btn>
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
        data: [],
        educationItemId: null,
        subVal: null,
        credits: null
      }
    },

    created(){

      this.initData();

      EventBus.$on('toggle-modules-form', (educationItemId, data, credits) => {
        this.dialog = !this.dialog;
        this.educationItemId = educationItemId;
        this.sumVal = _.sumBy(data, (item) => {return item.value})*8;
        this.credits = credits;

        if(!_.isEmpty(data)){
          _.forEach(data, (item) => {
            this.data[item.module_number - 1].value = item.value;
          })
        }
      });
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Створення' : 'Заповнити данні розподілу по модулям'
      },
      validator(){


        let sumHours = _.sumBy(this.data, (item) => {return +item.value});
        return (sumHours) ? ((this.credits*30)*0.25)/8 >= sumHours || (this.credits*30) < sumHours*8 : false;
      }
    },

    methods:{
      ...mapMutations({
        'updateDistributionOfHours': 'plan/updateDistributionOfHours'
      }),

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

        let data = _.filter(this.data, (item) => {
          return item.value !== '' && _.isNumber(parseInt(item.value));
        });

        let formattedData = _.map(data, (item) => {
          return{
            "education_item_id": this.educationItemId,
            "module_number": item.module_number,
            "value": item.value,
          }
        });


        Api().post('distribution-of-hours/store', {
          educationItemId: this.educationItemId,
          data: formattedData
        })
          .then((response) => {
            this.updateDistributionOfHours({educationItemId: this.educationItemId, data: response.data});
            this.dialog = false;
          })
          .catch((err) => {
            console.log(err);
          })

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
