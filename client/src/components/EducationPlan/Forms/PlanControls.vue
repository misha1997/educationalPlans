<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">Норми контролю начального плану</span>
          </v-card-title>

          <v-card-text>
            <v-alert :value="validator" color="error" icon="new_releases">
              Сума годин за перший курс не повинна перевищувати 22 години
            </v-alert>
            <v-alert :value="validator2" color="error" icon="new_releases">
              Сума годин за другий, третій, четвертий курс не повинна перевищувати 20 годин
            </v-alert>
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
                  <td v-for="item in hoursWeek">
                    <v-text-field v-model="item.hours_week" type="number" min="0"  :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість екзаменів</td>
                </tr>
                <tr>
                  <td v-for="item in credit">
                    <v-text-field v-model="item.credit" type="number" min="0" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість курсових робіт</td>
                </tr>
                <tr>
                  <td v-for="item in courseWork">
                    <v-text-field v-model="item.course_work" type="number" min="0" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість контрольних робіт</td>
                </tr>
                <tr>
                  <td v-for="item in сontrolWork">
                    <v-text-field v-model="item.сontrol_work" type="number" min="0" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>
              </table>
            </v-container>
          </v-card-text>

          <v-card-actions v-show="$store.state.role == 'admin'">
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
  import {successAlert, errorAlert} from '../../../services/Swal';

  const ROMAN_NUMBERS = ["I", "II", "III", "IV"]

  export default {
    data(){
      return {
        dialog: false,
        hoursWeek: [],
        credit: [],
        courseWork: [],
        сontrolWork: [],
        educationPlanId: null
      }
    },

    created(){

      this.initData();

      EventBus.$on('toggle-plan-controls-form', (id, data) => {
        this.educationPlanId = id;
        this.dialog = !this.dialog;
        if(!_.isEmpty(data)){
          _.forEach(data, (item) => {
            this.hoursWeek[item.module_number - 1].hours_week = (item.hours_week == 0) ? '' : item.hours_week;
            this.credit[item.module_number - 1].credit = (item.credit == 0) ? '' : item.credit;
            this.courseWork[item.module_number - 1].course_work = (item.course_work == 0) ? '' : item.course_work;
            this.сontrolWork[item.module_number - 1].сontrol_work = (item.сontrol_work == 0) ? '' : item.сontrol_work;
          })
        }
      });
    },
    computed: {
      validator(){
        var sumHours1 = 0;
        for(let i = 0; i < 4; i++) {
          sumHours1 += +this.hoursWeek[i].hours_week
        }
        return (sumHours1 <= 22) ? false : true
      },
      validator2(){
        var sumHours2 = 0;
        var sumHours3 = 0;
        var sumHours4 = 0;
        for(let i = 4; i < 8; i++) {
          sumHours2 += +this.hoursWeek[i].hours_week
        }
        for(let i = 8; i < 12; i++) {
          sumHours3 += +this.hoursWeek[i].hours_week
        }
        for(let i = 12; i < 16; i++) {
          sumHours4 += +this.hoursWeek[i].hours_week
        }
        return (sumHours2 <= 20 && sumHours3 <= 20 && sumHours4 <= 20) ? false : true
      }
    },
    methods:{
      initData(){
        let counter = 0;
        _.forEach(new Array(16), (item, index) => {
          this.hoursWeek.push({
            module_number: index+1,
            label: ROMAN_NUMBERS[counter],
            hours_week: ''
          });
          this.credit.push({
            module_number: index+1,
            label: ROMAN_NUMBERS[counter],
            credit: ''
          });
          this.courseWork.push({
            module_number: index+1,
            label: ROMAN_NUMBERS[counter],
            course_work: ''
          });
          this.сontrolWork.push({
            module_number: index+1,
            label: ROMAN_NUMBERS[counter],
            сontrol_work: ''
          });
          counter = (counter !== 3) ? counter + 1 : 0;
        });

      },

      close(){
        this.dialog = false;
      },

      save(){

        var controls = [];

        for(let i = 0; i < 16; i++) {
          controls.push({
            module_number: this.hoursWeek[i].module_number, 
            hours_week: (+this.hoursWeek[i].hours_week) ? +this.hoursWeek[i].hours_week : 0,
            credit: (+this.credit[i].credit != 0) ? +this.credit[i].credit : 0,
            course_work: (+this.courseWork[i].course_work != 0) ? +this.courseWork[i].course_work : 0,
            сontrol_work: (+this.сontrolWork[i].сontrol_work != 0) ? +this.сontrolWork[i].сontrol_work : 0,
            semester: Math.ceil(this.hoursWeek[i].module_number/2)
          })
        }

        Api().post('plan-controls', {
          planId : this.educationPlanId,
          controls
        })
        .then((response) => {
          this.dialog = false;
          successAlert("Запис був збережений");
        })
        .catch((err) => {
          console.log(err);
        })

      }
    },

    watch:{
      dialog: function(){
        if(this.dialog === false){
          this.hoursWeek = [],
          this.credit = [],
          this.courseWork = [],
          this.сontrolWork = [],
          this.initData();
        }
      }
    }
  }
</script>
<style>
  input[type='number'] {
    -moz-appearance:textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>