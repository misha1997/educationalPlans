<template>
  <div>
    <PlanControls></PlanControls>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Навчальні плани</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" icon color="primary" dark class="mb-2"> <v-icon>add</v-icon></v-btn>
        <v-form ref="form" @submit.prevent="save()">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.name" label="Назва освітнього плану" :rules="requiredField"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      :rules="requiredField"
                      :items="universities"
                      v-model="editedItem.subdivision_id"
                      @change="getDepartments"
                      item-text="name"
                      item-value="subdivision_id"
                      label="Підрозділ"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 v-if="isDepartments">
                    <v-select
                      :rules="requiredField"
                      :items="departments"
                      v-model="editedItem.department_id"
                      item-text="name"
                      item-value="department_id"
                      label="Кафедра"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="editedItem.year"
                      label="Рік"
                      prepend-icon="event"
                      :rules="requiredYear"
                    ></v-text-field>
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
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="data"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.department.name }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.year }}</td>
        <td>{{ props.item.created_at.substring(0,10) }}</td>
        <td class="justify-center layout px-1 pr-4">
          <v-icon
            small
            class="mr-2"
            @click="editControl()"
          >
            widgets
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
          <v-icon
            small
            @click="viewItem('/education-plan/' + props.item.id)"
          >
            remove_red_eye
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  import { EventBus } from '../../event-bus.js';

  import Api from '../../services/Api';

  import validation from '../../mixins/validation';
  import crud from '../../mixins/crud';

  import PlanControls from './Forms/PlanControls';

  export default{

    mixins: [validation, crud],

    components: {
      PlanControls
    },

    data(){
      return{

        apiUrl: 'education-plan',

        primaryKey: 'id',

        universities: [],

        departments: [],

        headers: [
          { text: 'Назва', value: 'name' },
          { text: 'Кафедра', value: 'department' },
          { text: 'Статус', value: 'status' },
          { text: 'Рік', value: 'year' },
          { text: 'Дата створення', value: 'created_at' },
          { text: '', sortable: false }
        ],

        editedItem: {
          user_id: this.$store.state.user,
          name: '',
          department_id: 0,
          year: null,
          subdivision_id: 0
        },
        defaultItem: {
          user_id: this.$store.state.user,
          name: '',
          department_id: 0,
          year: null,
          subdivision_id: 0,
        }
      }
    },

    created(){
      this.fetchData('education-plan'); 
      this.fetchSubDivisions();
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Новий освітній план' : 'Редагувати освітній план'
      },
      isDepartments(){
        return !_.isEmpty(this.departments);
      },
      getRequestId(){
        return this.editedItem.id;
      }
    },

    methods: {

      fetchSubDivisions(){
        Api().get('subdivisions')
          .then((response)=>{
            this.universities = _.map(response.data, (item)=>{
              return{
                subdivision_id: item.subdivision_id,
                name: item.name
              }
            });
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      getDepartments(){
        Api().get('departments/'+this.editedItem.subdivision_id)
          .then((response)=>{
            this.departments = _.map(response.data, (item)=>{
              return {
                department_id: item.department_id,
                name: item.name
              }
            });
            //this.editedItem.department_id = null;
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.getDepartments();
        this.dialog = true;
      },

      editControl() {
        EventBus.$emit('toggle-plan-controls-form');
      },

      viewItem(link){
        this.$router.push(link);
      }  
    }
  }
</script>
