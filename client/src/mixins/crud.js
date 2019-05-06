import {mapMutations} from "vuex";

import {successAlert, errorAlert} from '../services/Swal';
import Api from '../services/Api';

export default {

  data(){
    return {

      apiUrl: '',

      primaryKey: '',

      data: [],

      dialog: false,

      rowsPerPageItems: [100, 200, 300, {
        text: "$vuetify.dataIterator.rowsPerPageAll",
        value: -1,
      }],

      editedIndex: -1,
    }
  },

  created(){
    this.fetchData();
  },

  computed: {
    getRequestId(){
      throw "Must be rewrite in prent component";
    }
  },

  methods: {
    ...mapMutations({
      'enableLoading': 'overlay/enableLoading',
      'disableLoading': 'overlay/disableLoading'
    }),

    fetchData(){
      this.enableLoading();
      Api().get(this.apiUrl)
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => {
          errorAlert(err);
        })
        .then(()=>{
          this.disableLoading();
        })
    },

    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.data.indexOf(item)
      let isDelete = confirm('Вы уверены, что хотите удалить этот элемент?');
      if(isDelete) {
        this.enableLoading();
        Api().delete(`${this.apiUrl}/${item[this.primaryKey]}`)
          .then(res => {
            if(res.data.parent) {
              errorAlert(`Помилка ${res.data.parent.code}`);
            } else {
              this.data.splice(index, 1);
              successAlert("Запис був видалений");
            }
          })
          .catch((err) => {
            errorAlert(err);
          })
          .then(()=>{
            this.disableLoading();
          })

      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      }, 300)
    },

    save () {
      if(!this.$refs.form.validate())
        return;

      if (this.editedIndex > -1) {
        if(this.editedItem.password != undefined) {
          this.editedItem.password = this.editedItem.newPassword;
        }
        Object.assign(this.data[this.editedIndex], this.editedItem);
        this.enableLoading();
        Api().put(`${this.apiUrl}/${this.getRequestId}`,{
          data: this.editedItem
        })
          .then(()=>{
            successAlert("Запис був збережений");
          })
          .catch((err)=>{
            errorAlert(err);
          })
          .then(()=>{
            this.disableLoading();
          })

      } else {
        this.enableLoading();
        Api().post(this.apiUrl,this.editedItem)
          .then((response)=>{
            if(response.data.user == undefined) {
              this.data.push(response.data);
            } else {
              this.data.push(response.data.user);
              this.emails.push(response.data.user.email);
            }
            successAlert("Запис був збережений");
            this.$refs.form.reset();
          })
          .catch((err)=>{
            errorAlert(err);
          })
          .then(()=>{
            this.disableLoading();
          })

      }
      this.close()
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
