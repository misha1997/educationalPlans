<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="stageItems"
      class="mb-2"
      :hide-actions="true"
    >
      <template slot="items" slot-scope="props">
        <subject :data="props"></subject>
      </template>

    </v-data-table>

    <v-btn color="info" class="mx-0" @click="addSubject()">Додати предмет</v-btn>
  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex';
  import { EventBus } from '../../event-bus.js';

  import Subject from './Stage/Subject';

  export default{

    components: {
      Subject
    },

    props: {
      subCategory: {
        type: Object,
        required: true
      }
    },

    data(){
      return {
        headers: [
          {
            text: '#',
            align: 'left',
            sortable: false,
          },
          { text: 'Премет', value: 'subject.name', align: 'center'},
          { text: 'Кількість кредитів ЄКТС', value: 'credits', align: 'center' },
          { text: 'Загальний обсяг', value: 'credits', align: 'center' },
          { text: 'Лекції', value: 'lectures', align: 'center' },
          { text: 'Практичні, семінарські', value: 'practice', align: 'center' },
          { text: 'Лабораторні', value: 'laboratories', align: 'center'},
          { text: '', value: 'name', sortable: false }
        ],
      }
    },

    computed: {
      ...mapGetters({
        'getEducationItems': 'plan/getEducationItems'
      }),

      stageItems(){
        return _.filter(this.getEducationItems, (item) => {
          return item.sub_category_id === this.subCategory.sub_category_id;
        })
      }
    },

    methods: {
      ...mapActions({
        'createEducationItem': 'plan/createEducationItem'
      }),

      addSubject(){
        EventBus.$emit('toggle-item-form');
        this.createEducationItem(this.subCategory.sub_category_id);
      }
    }
  }
</script>
