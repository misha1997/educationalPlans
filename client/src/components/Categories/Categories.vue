<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Категорії навчального плану</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" icon color="primary" v-if="$store.state.role == 'admin'" dark class="mb-2"> <v-icon title="Додати">add</v-icon></v-btn>
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
                Кількість кредитів повинна бути не більше {{ creditsAll - cycleCredits }}
              </v-alert>
              <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.name" label="Назва категорії" :rules="requiredField"></v-text-field>
                </v-flex>
                 <v-flex xs12>
                    <v-select
                      :rules="requiredField"
                      :items="cycles"
                      v-model="editedItem.cycles_id"
                      item-text="name"
                      item-value="cycles_id"
                      label="Назва циклу"
                      required
                    ></v-select>
                  </v-flex>
                <v-flex xs12>
                  <v-text-field v-model.number="editedItem.credits" label="Усього кредитів" type="number"></v-text-field>
                </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Відміна</v-btn>
              <v-btn color="blue darken-1" flat type="submit" v-if="!validator">Зберегти</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="data"
      :rows-per-page-items="rowsPerPageItems"
      rows-per-page-text="Кількість рядків на сторінці"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
      
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.credits | zeroValue }}</td>
        <td>{{ props.item.cycle.name }}</td>
        <td class="justify-center layout px-1 pr-4">
          <v-icon
          title="Редагувати"
            small
            v-if="$store.state.role == 'admin'"
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
          title="Видалити"
            small
            v-if="$store.state.role == 'admin'"
            @click="deleteItem(props.item)"
          >
            delete
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

  import validation from '../../mixins/validation';
  import crud from '../../mixins/crud';
  import Api from '../../services/Api';

  export default{

    mixins: [validation, crud],

    data(){
      return{

        apiUrl: 'categories',

        primaryKey: 'category_id',

        cycles: [],
        categories: [],

        headers: [
          { text: 'Назва категорії', value: 'name' },
          { text: 'Кількість кредитів', value: 'credits' },
          { text: 'Назва циклу', value: 'cycle' },
          { text: '', value: 'name', sortable: false }
        ],

        creditsAll: 0,
        cycleCredits: 0,

        editedItem: {
          name: '',
          credits: null,
          cycles_id: ''
        },

        credits: null,

        defaultItem: {
          name: '',
          credits: null,
          cycles_id: ''
        }
      }
    },

    created(){
      this.fetchData('categories');
      this.fetchCycles();
      this.fetchCategories();
    },

    filters: {
      zeroValue: function (value) {
        if (value == null || value == 0) return ' - '
        return value;
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Нова категорія' : 'Редагувати категорію'
      },
      getRequestId(){
        return this.editedItem.category_id;
      },
      getRequestCyclesId(){
        return this.editedItem.cycles_id;
        
      },


      validator(){
          for (let i = 0; i < this.cycles.length; i++) {
            if(this.cycles[i].cycles_id == this.editedItem.cycles_id) {
              var cycles_id = this.editedItem.cycles_id;
              var category_id = this.editedItem.category_id;
              this.creditsAll = this.cycles[i].credits;
            }
          }
          let findCycles = this.data.filter(function(cycles) {
            return cycles.cycles_id == cycles_id && cycles.category_id != category_id;
          });

          this.cycleCredits = _.sumBy(findCycles, (item) => {return +item.credits});
          return (this.editedItem.credits) ? this.cycleCredits + +this.editedItem.credits > this.creditsAll : false;
      }
    },

    methods: {
      fetchCycles(){
        Api().get('cycles')
          .then((response)=>{
            this.cycles = _.map(response.data, (item)=>{
              return{
                cycles_id: item.cycles_id,
                credits: item.credits,
                name: item.name
              }
            });
          })
          .catch((err)=>{
            console.log(err);
          })
      },
     
      fetchCategories(){
        Api().get('categories')
          .then((response)=>{
            this.categories = _.map(response.data, (item)=>{
              return{
                category_id: item.category_id,
                cycles_id: item.cycles_id,
                credits: item.credits,
                name: item.name
              }
            });
          })
          .catch((err)=>{
            console.log(err);
          })
      },

    }
  }
  

</script>
