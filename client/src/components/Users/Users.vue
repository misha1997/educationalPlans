<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Користувачі</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" icon color="primary" dark class="mb-2"> <v-icon title="Додати">add</v-icon></v-btn>
        <v-form ref="form" @submit.prevent="save()">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.name" label="Ім'я" :rules="requiredField"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="editedItem.surname" label="Прізвище" :rules="requiredField"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="formEdit">
                    <v-text-field v-model="editedItem.email" label="Email" type="email" :rules="emailRules"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-else>
                    <v-text-field v-model="editedItem.email"  label="Email" type="email" :rules="loginEmailRules"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      :rules="requiredField"
                      :items="roles"
                      v-model="editedItem.role"
                      item-text="name"
                      item-value="role"
                      label="Роль"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 v-if="editedItem.role != 'admin'">
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
                  <v-flex xs12 v-if="isDepartments && editedItem.role != 'admin'">
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

                  <v-flex xs12 v-if="formEdit">
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.password" label="Пароль" type="password" :rules="passwordRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.repeatPassword" label="Повторіть пароль" type="password" :rules="repeatPasswordRules"></v-text-field>
                    </v-flex>
                  </v-flex>
                  <v-flex xs12 v-else>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.oldPassword" label="Старий пароль" type="password" :rules="oldPasswordRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.newPassword" label="Новий пароль" type="password" :rules="newPasswordRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.repeatNewPassword" label="Повторіть пароль" type="password" :rules="repeatNewPasswordRules"></v-text-field>
                    </v-flex>
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
        <td>{{ props.item.name + " " + props.item.surname }}</td>
        <td>{{ props.item.email }}</td>
        <td v-if="props.item.role == 'admin'">Адміністратор</td>
        <td v-if="props.item.role == 'repres_omu'">Представник ОМУ</td>
        <td v-if="props.item.role == 'repres_depart'">Представник кафедри</td>
        <td class="justify-center layout px-1 pr-4">
          <v-icon
          title="Редагувати"
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
          title="Видалити"
            small
            @click="deleteItem(props.item), deleteEmail()"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>

  import Api from '../../services/Api';
  import crud from '../../mixins/crud';
  import validation from '../../mixins/validation';

  export default{

    mixins: [validation, crud],

    data(){
      return{

        apiUrl: 'users',

        primaryKey: 'user_id',

        universities: [],

        departments: [],

        emails: [],

        roles: [
          {role: 'admin', name: 'Адміністратор'}, 
          {role: 'repres_omu', name: 'Представник ОМУ'}, 
          {role: 'repres_depart', name: 'Представник кафедри'}
        ],

        headers: [
          { text: 'Ім\'я', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Роль', value: 'role' },
          { text: '', value: 'name', sortable: false }
        ],

        editedItem: {
          name: '',
          department_id: null,
          surname: '',
          email: '',
          role: ''
        },
        defaultItem: {
          name: '',
          surname: '',
          department_id: null,
          email: '',
          role: '',
          password: ''
        }
      }
    },

    created(){
      this.fetchData('users');
      this.fetchSubDivisions();
      this.fetchEmails();
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Новий користувач' : 'Редагувати користувача'
      },

      formEdit () {
        return this.editedIndex === -1 ? true : false
      },

      isDepartments(){
        return !_.isEmpty(this.departments);
      },

      getRequestId(){
        return this.editedItem.user_id;
      }
    },
    methods: {

      deleteEmail() {
        delete this.emails.pop()
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.getDepartments();
        this.dialog = true;
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

      fetchEmails() {
        Api().get('users')
          .then((response)=>{
            for(let i = 0; i < response.data.length; i++) {
              this.emails.push(response.data[i].email)
            }
          })
          .catch((err)=>{
            console.log(err);
          })
      }
    }
  }


</script>
