<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">Розподіл контрольних заходів за семестрами</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model.number="editedItem.exams" label="Кількість екзаменів" type="number" min="0"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model.number="editedItem.credit" label="Кількість заліків" type="number" min="0"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model.number="editedItem.individual_tasks" label="Кількість індивідуальних завдань" type="number" min="0"></v-text-field>
                </v-flex>
              </v-layout>
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
  import {successAlert, errorAlert} from '../../../services/Swal';

  export default {
    data(){
      return {
        dialog: false,
        editedItem: {
          exams: '',
          credit: '',
          individual_tasks: ''
        },
        educationItemId: null,
      }
    },

    created(){
      EventBus.$on('toggle-distribution-of-controls-form', (educationItemId) => {
        this.educationItemId = educationItemId;
        this.fetchData();
        this.dialog = !this.dialog;
      });
    },

    methods: {
      ...mapMutations({
        'enableLoading': 'overlay/enableLoading',
        'disableLoading': 'overlay/disableLoading'
      }),

      fetchData() {
        Api().get(`distribution-of-controls/${this.educationItemId}`)
          .then((res)=>{
            this.editedItem = Object.assign({}, res.data)
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      close(){
        this.dialog = false;
      },

      save(){
        this.enableLoading();
        Api().post(`distribution-of-controls`, {
          educationItemId: this.educationItemId,
          data: this.editedItem
        })
        .then((response) => {
          this.dialog = false;
          successAlert("Запис був збережений");
        })
        .catch((err) => {
          errorAlert(err);
        })
        .then(()=>{
          this.disableLoading();
        });
      }
    },

    watch:{
      dialog: function(){
        if(this.dialog === false) {
          this.data = [];
        }
      }
    }
  }
</script>
