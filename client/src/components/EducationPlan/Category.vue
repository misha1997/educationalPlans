<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="stageItems"
      class="mb-2"
    >
      <template slot="items" slot-scope="props">
        <subject :data="props"></subject>
      </template>

    </v-data-table>

    <v-btn v-if="$store.state.role == 'admin'" color="info" class="mx-0" @click="addSubject()">Додати дисципліну</v-btn>
    <v-btn v-if="status != 'created' && $store.state.role != 'admin'" color="info" class="mx-0" @click="addSubject()">Додати дисципліну</v-btn>
  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex';
  import { EventBus } from '../../event-bus.js';
  import Subject from './Stage/Subject';
  import Api from '../../services/Api';

  export default{

    components: {
      Subject
    },

    props: {
      category: {
        type: Object,
        required: true
      },
      status: String
    },

    data(){
      return {
        headers: [
          {
            text: '#',
            align: 'left',
            sortable: false,
          },
          { text: 'Предмет', value: 'subject.name'},
          { text: 'Кількість кредитів ЄКТС', value: 'credits' },
          { text: 'Загальний обсяг', value: 'credits' },
          { text: 'Лекції', value: 'lectures' },
          { text: 'Практичні, семінарські', value: 'practice' },
          { text: 'Лабораторні', value: 'laboratories'},
          { text: '', value: 'name', sortable: false }
        ]
      }
    },

    computed: {
      ...mapGetters({
        'getEducationItems': 'plan/getEducationItems'
      }),

      stageItems(){
        return _.filter(this.getEducationItems, (item) => {
          return item.category_id === this.category.category_id;
        })
      }
    },

    methods: {
      ...mapActions({
        'createEducationItemCategory': 'plan/createEducationItemCategory'
      }),

      addSubject(){
        Api().get(`categories/${this.category.category_id}`)
          .then((response)=>{
            EventBus.$emit('toggle-item-form', _.sumBy(this.stageItems, (item) => { return (item.choice == 0) ? item.credits : 0 } ), response.data[0].credits);
            this.createEducationItemCategory({
              "category_id" : this.category.category_id, 
              "cycles_id" : this.category.cycles_id, 
              "fixed" : (this.status == 'created') ? 1 : 0
              });
          })
      }
    }
  }
</script>
