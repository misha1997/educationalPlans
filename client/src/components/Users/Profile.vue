<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Персональна сторінка</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
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
    >
      <template slot="items" slot-scope="props" v-if="props.item.user_id == $store.state.user">
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

        name: '',

        apiUrl: 'users',

        primaryKey: 'user_id',

        emails: [],

        headers: [
          { text: 'Ім\'я', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Роль', value: 'role' },
          { text: '', value: 'name', sortable: false }
        ],

        editedItem: {
          name: '',
          surname: '',
          email: '',
        },
        defaultItem: {
          name: '',
          surname: '',
          email: '',
          password: ''
        }
      }
    },

    created(){
      this.fetchData('users');
      this.fetchEmails();
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Новий користувач' : 'Редагувати користувача'
      },

      formEdit () {
        return this.editedIndex === -1 ? true : false
      },

      getRequestId(){
        return this.editedItem.user_id;
      }
    },
    methods: {
      deleteEmail() {
        delete this.emails.pop()
      },
      fetchEmails() {
        Api().get('users')
          .then((response)=>{
            for(let i = 0; i < response.data.length; i++) {
              this.emails.push(response.data[i].email)
            }
          })
      }
    }
  }


</script>
