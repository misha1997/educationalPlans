<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
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
              Кількість кредитів повинна бути не більше {{ creditCategory }}
            </v-alert>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                    <v-select
                      :rules="requiredField"
                      :items="subjects"
                      v-model="editedItem.subject_id"
                      item-text="name"
                      item-value="subject_id"
                      label="Предмети"
                      required
                    ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.credits" label="Кількість кредитів"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Відміна</v-btn>
            <v-btn color="blue darken-1" type="submit" flat v-if="!validator">Зберегти</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  import {EventBus} from "../../../event-bus";
  import {successAlert, errorAlert} from '../../../services/Swal';
  import Api from '../../../services/Api';

  import crud from '../../../mixins/crud';
  import validation from '../../../mixins/validation';

  export default{

    mixins: [validation, crud],

    data(){
      return {
        apiUrl: 'education-item',

        subjects: [],

        creditCategory: 0,
        who: null,

        primaryKey: 'education_item_id',

        editedItem: {
          subject_id: null,
          credits: null,
        },

        defaultItem: {
          subject_id: null,
          credits: null,
        },

      }
    },

    computed: {
      ...mapGetters({
        'isItemFormOpened': 'plan/isItemFormOpened',
        'getCurrentItem': 'plan/getCurrentItem'
      }),

      formTitle () {
        return this.editedIndex === -1 ? 'Нова категорія' : 'Редагувати категорію'
      },

      getRequestId(){
        return this.editedItem.education_item_id;
      },

      additionalData(){
        return _.assignIn(this.getCurrentItem, Object.assign(({}, {
          lectures: 0,
          practice: 0,
          laboratories: 0
        })));
      },

      validator(){
        console.log(this.credits)
        console.log(this.creditCategory)
        return false;
      }

    },

    created(){
      EventBus.$on('toggle-item-form', (credits, who) => {
        this.who = who;
        this.credits = credits;
        this.dialog = !this.dialog;
      });
      this.fetchSubjects();
      this.fetchData();
    },

    methods:{
      ...mapMutations({
        'addEducationItem': 'plan/addEducationItem',
        'resetCurrentItem': 'plan/resetCurrentItem'
      }),

      fetchSubjects() {
        Api().get('subjects')
          .then((response)=>{
            this.subjects = _.map(response.data, (item)=>{
              return{
                subject_id: item.subject_id,
                name: item.name
              }
            });
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      fetchData(){
        Api().get(`categories/${this.getCurrentItem.category_id}`)
          .then((response)=>{
            console.log(response)
            this.creditCategory = response.data[0].credits
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      save () {
        if(!this.$refs.form.validate())
          return;

        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem);
          this.enableLoading();
          Api().put(`${this.apiUrl}/${this.getRequestId}`,{
            name: this.editedItem.name
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
          console.log(this.editedItem)
          Api().post(this.apiUrl+'/store',Object.assign(this.editedItem, this.additionalData))
            .then((response)=>{
              response.data.distribution_of_hours = [];
              this.addEducationItem(response.data);
              this.resetCurrentItem();
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
    }
  }
</script>
