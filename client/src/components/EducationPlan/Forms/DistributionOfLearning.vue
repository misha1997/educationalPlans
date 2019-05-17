<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">Лекції/Лабораторні</span>
          </v-card-title>

          <v-card-text>

            <v-alert
              :value="validator2"
              type="info"
            >
              Сума годин повинна бути менше ніж {{ maxAmountOfHours }}
            </v-alert>

            <v-alert
              :value="validator"
              type="error"
            >
              Сума годин повинна бути менше ніж {{ maxAmountOfHours }}
            </v-alert>

            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model.number="editedItem.lectures" label="Кількість лекцій" type="number" min="0"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model.number="editedItem.laboratories" label="Кількість лабораторних" type="number" min="0"></v-text-field>
                </v-flex>
              </v-layout>
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
  import {successAlert, errorAlert} from '../../../services/Swal';
  import Api from '../../../services/Api';

  import validation from '../../../mixins/validation';

  export default{

    mixins: [validation],

    data(){
      return {
        dialog: false,

        editedItem: {
          lectures: '',
          laboratories: ''
        },

        educationItemId: null,
        maxAmountOfHours: null,

      }
    },

    computed: {
      ...mapGetters({
        'isItemFormOpened': 'plan/isItemFormOpened',
        'getCurrentItem': 'plan/getCurrentItem'
      }),

      currentAmountOHours(){
        return Math.abs(parseInt(this.editedItem.lectures) || 0) + Math.abs(parseInt(this.editedItem.laboratories) || 0);
      },

      validator2(){
        return (!_.isNaN(this.currentAmountOHours)) ? this.currentAmountOHours <= this.maxAmountOfHours : false;
      },

      validator(){
        return (!_.isNaN(this.currentAmountOHours)) ? this.currentAmountOHours > this.maxAmountOfHours : false;
      }
    },

    created(){
      EventBus.$on('toggle-distribution-of-learning-form', (educationItemId, data, amountOfHours) => {
        this.dialog = !this.dialog;
        this.educationItemId = educationItemId
        this.maxAmountOfHours = amountOfHours;
        _.assign(this.editedItem, data);
      });
    },

    methods:{
      ...mapMutations({
        'addEducationItem': 'plan/addEducationItem',
        'resetCurrentItem': 'plan/resetCurrentItem',
        'updateLearningData': 'plan/updateLearningData',
        'enableLoading': 'overlay/enableLoading',
        'disableLoading': 'overlay/disableLoading'
      }),

      save () {
        if(this.validator)
          return;

          this.enableLoading();

            Api().put('education-item/update-learning-plan/'+this.educationItemId,{
              lectures: this.editedItem.lectures == "" ? 0 : this.editedItem.lectures,
              laboratories: this.editedItem.laboratories == "" ? 0 : this.editedItem.laboratories
            })
            .then((response)=>{
              this.updateLearningData({educationItemId: this.educationItemId, data: response.data});
              successAlert("Запис був збережений");
            })
            .catch((err)=>{
              errorAlert(err);
            })
            .then(()=>{
              this.disableLoading();
            });

        this.close()
      },

      close(){
        this.dialog = false;
      }
    }
  }
</script>
