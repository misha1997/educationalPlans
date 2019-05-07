<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <v-form ref="form" @submit.prevent="save()">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md class="py-0">
              <v-flex xs12>
                  <v-text-field v-model="editedItem.exams" label="Кількість екзаменів" ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.credit" label="Кількість заліків" ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.individual_tasks" label="Кількість індивідуальних завдань" ></v-text-field>
                </v-flex>
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



  export default {
    data(){
      return {
        dialog: false,
        data: [],
        educationItemId: null,
      }
    },

    created(){

      

      EventBus.$on('toggle-distribution-of-controls-form', (educationItemId, data) => {
        this.dialog = !this.dialog;
        this.educationItemId = educationItemId;
        console.log(data);
_.assign(this.editedItem, data);
       
      });
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Створення' : 'Редагування'
      }
    },

    methods:{
      ...mapMutations({
        'updateDistributionOfControls': 'plan/updateDistributionOfControls'
      }),

      

      fetchData(){
        Api().post('distribution-of-controls', {
          id: this.educationItemId
        })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
      },

      close(){
        this.dialog = false;
      },

      save(){
        

        let formattedData = _.map(data, (item) => {
          return{
            "education_item_id": this.educationItemId,
            "exams": item.exams,
            "credit": item.credit,
            "individual_tasks": item.individual_tasks,
          }
        });


        Api().post('distribution-of-controls/store', {
          educationItemId: this.educationItemId,
          data: formattedData
        })
          .then((response) => {
            this.updateDistributionOfControls({educationItemId: this.educationItemId, data: response.data});
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
          
        }
      }
    }
  }
</script>
