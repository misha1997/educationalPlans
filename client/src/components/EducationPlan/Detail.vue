<template>
  <div>
    <v-toolbar dark color="primary mb-4">
      <v-toolbar-title>Навчальний план</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <distributionOfLearning></distributionOfLearning>
    <DistributionOfControls></DistributionOfControls>
    <creation-item></creation-item>
    <modules-form></modules-form>

    <v-btn color="info" class="mx-0" @click="saveExel()">Завантажити</v-btn>

    <div v-for="cycles in data" :key="cycles.id">
      <h3 class="text-md-center">{{ cycles.name }}</h3>
      <Cycles :cycles="cycles" v-if="cycles.categories.length == 0"></Cycles>
      <div v-for="category in cycles.categories" :key="category.id" class="mt-3 mb-4">
        <h3>{{ category.name }}</h3>
          <Category :category="category" v-if="category.sub_categories.length == 0"></Category>
          <div v-for="subCategory in category.sub_categories" :key="subCategory.id" class="mt-3 mb-4">
            <h4>{{ subCategory.name }}</h4>
              <SubCategory :subCategory="subCategory"></SubCategory>
          </div>
      </div>
    </div>

  </div>
</template>

<script>

  import {mapGetters, mapMutations} from 'vuex';

  import DistributionOfControls from './Forms/DistributionOfControls';
  import DistributionOfLearning from './Forms/DistributionOfLearning';
  import CreationItem from './Forms/CreationItem';
  import ModulesForm from './Forms/ModulesForm';
  import SubCategory from './SubCategory';
  import Category from './Category';
  import Cycles from './Cycles';
  import {successAlert, errorAlert} from '../../services/Swal';

  import Api from '../../services/Api';

  export default{

    components: {
      SubCategory,
      Category,
      Cycles,
      CreationItem,
      ModulesForm,
      DistributionOfLearning,
      DistributionOfControls
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
        Api().post('save-exel', {
          id: this.getEducationPlanId
        })
        successAlert("Файл завантажений");
      }

    }
  }

</script>
