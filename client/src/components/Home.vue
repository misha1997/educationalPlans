<template>
  <div>
    <PlanControls></PlanControls>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Навчальні плани</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="600px">
        <v-btn slot="activator" icon color="primary" v-if="$store.state.role == 'admin'" dark class="mb-2"> <v-icon title="Додати">add</v-icon></v-btn>
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
                      label="Факультет"
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
                    <v-select
                      :rules="requiredField"
                      :items="qualification"
                      v-model="editedItem.qualification"
                      item-text="name"
                      item-value="name"
                      label="Кваліфікація"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.training_period" label="Термін навчання" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.discipline" label="Галузь знань" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.specialty" label="Спеціальність" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.specialization" label="Спеціалізація" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.educational_program" label="Освітня програма" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.educational_level" label="Освітній (освітньо-науковий) рівень" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="editedItem.form_study" label="Форма навчання" :rules="requiredField"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field
                      v-model="editedItem.year"
                      label="Рік прийому"
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
    <v-flex xs4 class="px-3 mt-3">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Пошук"
      ></v-text-field>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      rows-per-page-text="Кількість рядків на сторінці"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props" v-if="filterPlan(props.item)"
      >
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.department.name }}</td>
        <td v-if="props.item.status == 'created'">Шаблон</td>
        <td v-if="props.item.status == 'cloned'">Копія плану</td>
        <td v-if="props.item.status == 'verified'">Верифікований</td>
        <td v-if="props.item.status == 'on refinement'">Треба доопрацювати</td>
        <td v-if="props.item.status == 'on verification'">На верифікації</td>
        <td>{{ props.item.year }}</td>
        <td>{{ props.item.created_at.substring(0,10) }}</td>
        <td class="right layout px-1 pr-4">

          <v-icon
            title="Норми котролю"
            small
            class="mr-2"
            @click="editControl(props.item)"
            v-if="$store.state.role == 'admin'"
          >
            widgets
          </v-icon>

          <v-icon
            title="Видалити"
            small
            class="mr-2"
            @click="deleteItem(props.item)"
            v-if="filterPlanButton(props.item)"
          >
            delete
          </v-icon>

          <v-icon
            title="Редагувати"
            small
            class="mr-2"
            @click="editItem(props.item)"
            v-if="filterPlanButton(props.item)"
          >
            edit
          </v-icon>

          <v-icon
            title="Відкрити"
            small
            @click="viewItem('/education-plan/' + props.item.id)"
          >
            remove_red_eye
          </v-icon>
        </td>

      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  import { EventBus } from '../event-bus.js';

  import Api from '../services/Api';

  import validation from '../mixins/validation';
  import crud from '../mixins/crud';

  import PlanControls from './EducationPlan/Forms/PlanControls';

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

        qualification: [
          {key: 'bachelor', name: 'Бакалавр'}, 
          {key: 'master', name: 'Магістр'}, 
          {key: 'postgraduate', name: 'Аспірант'}
        ],

        search: '',

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
          qualification: 0,
          discipline: '',
          training_period: '',
          specialty: '',
          specialization: '',
          educational_program: '',
          educational_level: '',
          discipline: '',
          form_study: '',
          year: null,
          subdivision_id: 0
        },
        defaultItem: {
          user_id: this.$store.state.user,
          name: '',
          department_id: 0,
          qualification: 0,
          discipline: '',
          training_period: '',
          specialty: '',
          specialization: '',
          educational_program: '',
          educational_level: '',
          discipline: '',
          form_study: '',
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
      filterPlan(item) {
        if(this.$store.state.role == 'admin') {
          return true
        } else if (this.$store.state.role == 'repres_omu') {
          return this.$store.state.department == item.department_id
        } else {
          return item.user_id == this.$store.state.user || item.status == 'created' && this.$store.state.department == item.department_id
        }
      },
      filterPlanButton(item) {
        if(this.$store.state.role == 'admin') {
          return true
        } else {
          return item.status != 'created' && this.$store.state.role != 'admin'
        }
      },
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

      editControl(item) {

        Api().get(`plan-controls/${item.id}`)
          .then((response) => {
            EventBus.$emit('toggle-plan-controls-form', item.id, response.data);
          })
          .catch((err) => {
            console.log(err);
          })

      },

      viewItem(link){
        this.$router.push(link);
      }  
    }
  }
</script>
