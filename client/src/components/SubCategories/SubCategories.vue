<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Підкатегорії навчального плану</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" icon color="primary" dark class="mb-2"> <v-icon>add</v-icon></v-btn>
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
                Кількість кредитів повинна бути не більше {{ creditsAll - credits }}
              </v-alert>
              <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.name" label="Назва підкатегорії" :rules="requiredField"></v-text-field>
                </v-flex>
                 <v-flex xs12>
                    <v-select
                      :rules="requiredField"
                      :items="categories"
                      v-model="editedItem.category_id"
                      item-text="name"
                      item-value="category_id"
                      label="Назва категорії"
                      required
                    ></v-select>
                  </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.credits" label="Усього кредитів" :rules="requiredField"></v-text-field>
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
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
      
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.credits | zeroValue }}</td>
        <td>{{ props.item.category.name }}</td>
        <td class="justify-center layout px-1 pr-4">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
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

        apiUrl: 'sub-categories',

        primaryKey: 'sub_category_id',

        categories: [],
        cycles: [],
        subCategories: [],

        headers: [
          { text: 'Назва підкатегорії', value: 'name' },
          { text: 'Кількість кредитів', value: 'credits' },
          { text: 'Назва категорії', value: 'subCategoryName' },
          { text: '', value: 'name', sortable: false }
        ],

        creditsAll: 0,

        editedItem: {
          name: '',
          credits: '',
          category_id: 0
        },

        credits: '',

        defaultItem: {
          name: '',
          credits: '',
          category_id: 0
        }
      }
    },

    created(){
      this.fetchData('sub-categories');
      this.fetchCategories();
      this.fetchCycles();
      this.fetchSubCategories();
    },

    filters: {
      zeroValue: function (value) {
        if (value == 0) return ' - '
        return value;
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Нова підкатегорія' : 'Редагувати підкатегорію'
      },
      getRequestId(){
        return this.editedItem.sub_category_id;
      },
      getRequestCategoryId(){
        return this.editedItem.category_id;
      },
      validator(){
        var subCategoriesCredits = 0;
        for(let i = 0; i < this.categories.length; i++) {
          if(this.categories[i].category_id == this.editedItem.category_id) {
            var cycleId = this.categories[i].cycles_id;
          }
        }

        for(let i = 0; i < this.subCategories.length; i++) {
          if(this.subCategories[i].sub_category_id != this.editedItem.sub_category_id) {
            subCategoriesCredits += this.subCategories[i].credits;
          }
        }
        
        for(let i = 0; i < this.cycles.length; i++) {
          if(this.cycles[i].cycles_id == cycleId) {
            this.creditsAll = this.cycles[i].credits;
          }
        }
        return (this.editedItem.credits) ? subCategoriesCredits + +this.editedItem.credits > this.creditsAll : false;
      }
    },

    methods: {
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
     
      fetchSubCategories(){
        Api().get('sub-categories')
          .then((response)=>{
            this.subCategories = _.map(response.data, (item)=>{
              return{
                sub_category_id: item.sub_category_id,
                category_id: item.category_id,
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
