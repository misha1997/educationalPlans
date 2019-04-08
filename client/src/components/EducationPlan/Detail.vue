<template>
  <div>
    <v-toolbar dark color="primary mb-4">
      <v-toolbar-title>Навчальний план</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <distributionOfLearning></distributionOfLearning>
    <creation-item></creation-item>
    <modules-form></modules-form>

    <v-btn color="info" class="mx-0" @click="saveExel()">Завантажити</v-btn>

    <div v-for="category in data">
      <h2>{{ category.name }}</h2>

      <div v-for="subCategory in category.sub_categories" class="mt-3 mb-4">
        <h5>{{ subCategory.name }}</h5>

        <stage :subCategory="subCategory"></stage>

      </div>
    </div>

  </div>
</template>

<script>

  import {mapGetters, mapMutations} from 'vuex';

  import DistributionOfLearning from './Forms/DistributionOfLearning';
  import CreationItem from './Forms/CreationItem';
  import ModulesForm from './Forms/ModulesForm';
  import Stage from './Stage';

  import Api from '../../services/Api';

  export default{

    components: {
      Stage,
      CreationItem,
      ModulesForm,
      DistributionOfLearning
    },

    data(){
      return {
        data: []
      }
    },

    computed:{
      ...mapGetters({
        'getEducationPlanId': 'plan/getEducationPlanId'
      })
    },

    created(){
      this.fetchData();
    },

    methods: {
      ...mapMutations({
        'setEducationPlanId': 'plan/setEducationPlanId',
        'setEducationItems': 'plan/setEducationItems'
      }),

      fetchData(){
        this.setEducationPlanId(parseInt(this.$route.params.id));

        if(this.getEducationPlanId){
          Api().post('education-item', {
            id: this.getEducationPlanId
          })
            .then((response)=>{
              this.data = response.data.data;
              this.setEducationItems(response.data.educationItems);
            })
            .catch((err)=>{
              console.log(err);
            })
        }
      },

      saveExel(){
        Api().post('save-plan', {
          id: this.getEducationPlanId
        })
      }

    }
  }

</script>