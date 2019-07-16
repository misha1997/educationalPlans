<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Цикли навчального плану</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field v-model="editedItem.name" label="Назва циклу" :rules="requiredField"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model.number="editedItem.credits" label="Кількість кредитів" type="number" :rules="requiredField"></v-text-field>
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
      rows-per-page-text="Кількість рядків на сторінці"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name.toUpperCase() }}</td>
        <td>{{ props.item.credits | zeroValue }}</td>
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

  import crud from '../../mixins/crud';
  import validation from '../../mixins/validation';

  export default{

    mixins: [validation, crud],

    data(){
      return{

        apiUrl: 'cycles',

        primaryKey: 'cycles_id',

        headers: [
          { text: 'Назва циклу', value: 'name' },
          { text: 'Кількість кредитів', value: 'credits' },
          { text: '', value: 'name', sortable: false }
        ],

        editedItem: {
          name: '',
          credits: ''
        },
        defaultItem: {
          name: '',
          credits: ''
        }
      }
    },

    created(){
      this.fetchData();
    },

    filters: {
      zeroValue: function (value) {
        if (value == 0) return ' - '
        return value;
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Новий цикл' : 'Редагувати цикл'
      },

      getRequestId(){
        return this.editedItem.cycles_id;
      }
    }
  }


</script>
