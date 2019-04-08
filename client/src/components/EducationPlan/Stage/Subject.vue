<template>
  <tr>
    <td class="text-center">{{ data.index + 1 }}</td>
        <td class="text-center">{{ data.item.subject.name }}</td>
        <td class="text-center">{{ data.item.credits }}</td>
        <td class="text-center">{{ data.item.credits*30 }}</td>
        <td class="text-center">{{ data.item.lectures | zeroValue }}</td>
        <td class="text-center">{{ data.item.practice | zeroValue }}</td>
        <td class="text-center">{{ data.item.laboratories | zeroValue }}</td>
        <td class="justify-center layout px-1 pr-4">
          <v-icon
            small
            class="mr-2"
            @click="distributionOfLearningForm(data.item.education_item_id)"
            v-if="isDistributionOfHours"
          >
            school
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="modulesForm(data.item.education_item_id)"
          >
            today
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="editItem(data.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(data.item)"
          >
            delete
          </v-icon>
        </td>
  </tr>
</template>

<script>
  import {mapMutations} from 'vuex';

  import { EventBus } from '../../../event-bus.js';
  import Api from '../../../services/Api';
  import {successAlert, errorAlert} from '../../../services/Swal';

  export default {
    props: {
      data: {
        type: Object,
        require: true
      }
    },

    filters: {
      zeroValue: function (value) {
        if (value == 0) return ' - '

        return value;
      }
    },

    computed: {
      getDistributionOfHours(){
        return this.data.item.distribution_of_hours;
      },

      isDistributionOfHours(){
        return this.getDistributionOfHours.length > 0;
      },

      amountOfHours(){
        return _.sumBy(this.getDistributionOfHours, (item) => {return item.value}) * 8;
      },

      getLearningData(){
        return {
          lectures: this.data.item.lectures,
          practice: this.data.item.practice,
          laboratories: this.data.item.laboratories
        }
      }
    },

    methods: {
      ...mapMutations({
        'updateEducationItem': 'plan/updateEducationItem',
        'removeEducationItem': 'plan/removeEducationItem',
        'enableLoading': 'overlay/enableLoading',
        'disableLoading': 'overlay/disableLoading'
      }),

      editItem(){
        EventBus.$emit('toggle-item-form', educationItemId);
      },

      deleteItem (item) {
        let isDelete = confirm('Вы уверены, что хотите удалить этот элемент?');
        if(isDelete) {
          this.enableLoading();
          Api().delete(`education-item/${item.education_item_id}`)
            .then(() => {
              this.removeEducationItem(item.education_item_id);
              successAlert("Запис був видалений");
            })
            .catch((err) => {
              errorAlert(err);
            })
            .then(()=>{
              this.disableLoading();
            })

        }
      },

      modulesForm(educationItemId){
        EventBus.$emit('toggle-modules-form', educationItemId, this.getDistributionOfHours);
      },

      distributionOfLearningForm(educationItemId){
        EventBus.$emit('toggle-distribution-of-learning-form', educationItemId, this.getLearningData, this.amountOfHours);
      }
    }
  }
</script>
