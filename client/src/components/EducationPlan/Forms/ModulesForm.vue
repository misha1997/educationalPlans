<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">Заповнити дані розподілу за модулями</span>
          </v-card-title>

          <v-card-text>

            <v-alert :value="сourseWorkValid" type="warning">
              Кількість курсових робіт в семестрі вичерпана
            </v-alert>

            <v-alert :value="сontrolWorkValid" type="warning">
              Кількість контрольних робіт в семестрі вичерпана
            </v-alert>

            <v-alert :value="examValid" type="warning">
              Кількість іспитів в семестрі вичерпана
            </v-alert>

            <v-alert :value="validator" type="warning">
              Кількість годин повинна бути в діапазоні від {{ Math.ceil((credits*30)/32) }} до {{ Math.floor((credits*30)/8) }}
            </v-alert>

            <v-container grid-list-md class="py-0">
              <table class="table table-bordered text-center">
                <tr>
                  <td colspan="16">Розподіл годин на тиждень за курсами, семестрами і модульними атестаційними циклами</td>
                </tr>
                <tr>
                  <td colspan="4" v-for="index in 4" :key="index">{{ index }} курс</td>
                </tr>
                <tr>
                  <td colspan="16">Семестри</td>
                </tr>
                <tr>
                  <td colspan="2" v-for="index in 8" :key="index">{{ index }}</td>
                </tr>
                <tr>
                  <td colspan="16">Модульні атестаційні цикли</td>
                </tr>
                <tr>
                  <td v-for="(item, i) in data" :class="{ activMod: i === activMod }">
                    <v-text-field 
                      v-model="item.value" 
                      type="number" min="0"
                      @click="activMod = i; moduleNumber = item.module_number"
                      :label="item.label"
                    >
                    </v-text-field>
                  </td>
                </tr>
              </table>
              <v-flex xs12>
                <div v-for="item in data">
                <v-select style="width: 48%" class="left ml-2"
                  v-if="moduleNumber == item.module_number"
                  :items="formControl"
                  v-model="item.form_control"
                  item-text="val"
                  item-value="key"
                  label="Форма контролю"
                  required
                ></v-select>
                <v-select style="width: 48%" class="right mr-2" 
                  v-if="moduleNumber == item.module_number"
                  :items="individualTasks"
                  v-model="item.individual_tasks"
                  item-text="val"
                  item-value="key"
                  label="Індивідуальні завдання"
                  required
                ></v-select>
                </div>
              </v-flex>
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

  import validation from '../../../mixins/validation';

  const ROMAN_NUMBERS = ["I", "II", "III", "IV"]

  export default {

    mixins: [validation],

    data(){
      return {
        dialog: false,
        data: [],
        moduleNumber: null,
        educationItemId: null,
        subVal: null,
        activMod: null,
        controls: {},
        controlsPlan: [],
        credits: null,
        formControl: [
          {key: 'no-certit', val: 'Без атестацій'}, 
          {key: 'credit', val: 'Залік'}, 
          {key: 'differscore', val: 'Диференційний залік'}, 
          {key: 'exam', val: 'Іспит'}
        ],
        individualTasks: [
          {key: 'no-individual', val: 'Без завдання'}, 
          {key: 'сontrolwork', val: 'Контрольна робота'}, 
          {key: 'сoursework', val: 'Курсова робота'}
        ],
      }
    },

    created(){

      this.initData();

      EventBus.$on('toggle-modules-form', (educationItemId, data, credits, controlsPlan, controls) => {
        this.controlsPlan = controlsPlan;
        this.controls = controls;
        this.dialog = !this.dialog;
        this.educationItemId = educationItemId;
        this.sumVal = _.sumBy(data, (item) => {return item.value})*8;
        this.credits = credits;

        if(!_.isEmpty(data)){
          _.forEach(data, (item) => {
            this.data[item.module_number - 1].value = item.value;
            this.data[item.module_number - 1].form_control = item.form_control;
            this.data[item.module_number - 1].individual_tasks = item.individual_tasks;
          })
        }
      });
    },

    computed: {
      examValid() {
        var exams = _.filter(this.controlsPlan, {
          semester: Math.ceil(this.moduleNumber/2)
        })
        var res = 0;
        for(let i = 0; i < exams.length; i++) {
          res += exams[i].exams
        }
        if(exams.length != 0) {
          var aa = _.filter(this.controls, {semester: Math.ceil(this.moduleNumber/2)});
          var examCount = 0;
          for(let i = 0; i < aa.length; i++) {
            if(aa[i].form_control == "exam") {
              examCount++
            }
          }
          var dd = this.data.filter((data) => {return data.semester == Math.ceil(this.moduleNumber/2)})
          for (let i = 0; i < dd.length; i++){
            if(dd[i].form_control == 'exam') {
              examCount++
            }
          }
          return (examCount <= res) ? false : true
        } else {
          return false
        }
      },

      сontrolWorkValid() {
        var сontrol_work = _.filter(this.controlsPlan, {
          semester: Math.ceil(this.moduleNumber/2)
        })
        var res = 0;
        for(let i = 0; i < сontrol_work.length; i++) {
          res += сontrol_work[i].сontrol_work
        }
        if(сontrol_work.length != 0) {
          var aa = _.filter(this.controls, {semester: Math.ceil(this.moduleNumber/2)});
          var сontrolwork = 0;
          for(let i = 0; i < aa.length; i++) {
            if(aa[i].individual_tasks == "сontrolwork") {
              сontrolwork++
            }
          }
          var dd = this.data.filter((data) => {return data.semester == Math.ceil(this.moduleNumber/2)})
          for (let i = 0; i < dd.length; i++){
            if(dd[i].individual_tasks == 'сontrolwork') {
              сontrolwork++
            }
          }
          return (сontrolwork <= res) ? false : true
        } else {
          return false
        }
      },


      сourseWorkValid() {
        var course_work = _.filter(this.controlsPlan, {
          semester: Math.ceil(this.moduleNumber/2)
        })
        var res = 0;
        for(let i = 0; i < course_work.length; i++) {
          res += course_work[i].course_work
        }
        if(course_work.length != 0) {
          var aa = _.filter(this.controls, {semester: Math.ceil(this.moduleNumber/2)});
          var сoursework = 0;
          for(let i = 0; i < aa.length; i++) {
            if(aa[i].individual_tasks == "сoursework") {
              сoursework++
            }
          }
          var dd = this.data.filter((data) => {return data.semester == Math.ceil(this.moduleNumber/2)})
          for (let i = 0; i < dd.length; i++){
            if(dd[i].individual_tasks == 'сoursework') {
              сoursework++
            }
          }
          return (сoursework <= res) ? false : true
        } else {
          return false
        }
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
            value: '',
            form_control: '',
            individual_tasks: '',
            semester: Math.ceil((index+1)/2)
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
            "form_control": item.form_control,
            "individual_tasks": item.individual_tasks,
            "semester" : Math.ceil(item.module_number/2)
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
          this.moduleNumber = null;
          this.activMod = null;
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
  .activMod {
    background: #dedede;
  }
</style>