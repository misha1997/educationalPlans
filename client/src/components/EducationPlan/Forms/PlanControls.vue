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
                  <td v-for="item in hoursWeek">
                    <v-text-field v-model="item.hours_week" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість екзаменів</td>
                </tr>
                <tr>
                  <td v-for="item in credit">
                    <v-text-field v-model="item.credit" :label="item.label">
                    </v-text-field>
                  </td>
                </tr>

                <tr>
                  <td colspan="16">Кількість курсових робіт</td>
                </tr>
                <tr>
                  <td v-for="item in courseWork">
                    <v-text-field v-model="item.course_work" :label="item.label">
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
  import {successAlert, errorAlert} from '../../../services/Swal';

  const ROMAN_NUMBERS = ["I", "II", "III", "IV"]

  export default {
    data(){
      return {
        dialog: false,
        hoursWeek: [],
        credit: [],
        courseWork: [],
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
            this.hoursWeek[item.module_number - 1].hours_week = item.hours_week;
            this.credit[item.module_number - 1].credit = item.credit;
            this.courseWork[item.module_number - 1].course_work = item.course_work;
          })
        }
      });
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
          counter = (counter !== 3) ? counter + 1 : 0;
        });

      },

      close(){
        this.dialog = false;
      },

      save(){

        let hoursWeek = _.filter(this.hoursWeek, (item) => {
          return item.hours_week !== '' && _.isNumber(parseInt(item.hours_week));
        });

        let credit = _.filter(this.credit, (item) => {
          return item.credit !== '' && _.isNumber(parseInt(item.credit));
        });

        let courseWork = _.filter(this.courseWork, (item) => {
          return item.course_work !== '' && _.isNumber(parseInt(item.course_work));
        });

        Api().post('plan-controls', {
          planId : this.educationPlanId,
          controls : _.merge(hoursWeek, credit, courseWork)
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
          this.initData();
        }
      }
    }
  }
</script>
