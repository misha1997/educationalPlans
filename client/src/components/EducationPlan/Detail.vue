<template>
  <div class="mb-5">
    <v-toolbar dark color="primary mb-4">
      <v-toolbar-title>{{ name }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <distributionOfLearning></distributionOfLearning>
    <creation-item></creation-item>
    <modules-form></modules-form>

    <v-btn color="info" class="mx-0" @click="viewHome('/')">Перейти до роботи з планами</v-btn>
    <v-btn color="info" class="mx-0" @click="openTable()">Переглянути</v-btn>
    <v-btn color="info" class="mx-0" v-if="status == 'created'" @click="clonePlan()">Створити план за шаблоном</v-btn>
    <v-btn color="info" class="mx-0" v-if="status == 'cloned'" @click="clonePlan()">Зробити копію плану</v-btn>

    <v-btn v-if="status != 'created' && $store.state.role == 'repres_depart'" color="info right" class="mx-0" @click="sendVerify()">Відправити на верифікацію</v-btn>

    <v-btn v-if="status == 'on verification' && $store.state.role == 'repres_omu'" color="info right" class="mx-1" @click="verify()">Підтвердити</v-btn>
    <v-btn v-if="status == 'on verification' && $store.state.role == 'repres_omu'" color="info right" class="mx-1" @click="refinement()">Відправити на доопрацювання</v-btn>

    <div v-for="cycles in sortedCycles" :key="cycles.id" class="mt-4">
      <h3 class="text-md-center">{{ cycles.name.toUpperCase() }}</h3>
      <Cycles :cycles="cycles" :status="status" v-if="cycles.categories.length == 0"></Cycles>
      <div v-for="category in cycles.categories" :key="category.id" class="mt-3 mb-4">
        <h3 class="text-md-center">{{ category.name }}</h3>
          <Category :category="category" :status="status" v-if="category.sub_categories.length == 0"></Category>
          <div v-for="subCategory in category.sub_categories" :key="subCategory.id" class="mt-3 mb-4">
            <h4 class="text-md-center">{{ subCategory.name }}</h4>
              <SubCategory :subCategory="subCategory" :status="status"></SubCategory>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapGetters, mapMutations} from 'vuex';

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
      DistributionOfLearning
    },

    data(){
      return {
        data: [],
        name: '',
        status: ''
      }
    },

    computed:{
      ...mapGetters({
        'getEducationPlanId': 'plan/getEducationPlanId'
      }),
      sortedCycles() {
        function compare(a, b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }
        return this.data.sort(compare);
      }
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
        Api().get(`education-plan/${this.$route.params.id}`).then((response)=>{
          this.name = response.data[0].name;
          this.status = response.data[0].status;
        });
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

      openTable(){
        this.$router.push(`view/${this.getEducationPlanId}`);
      },

      clonePlan(){
        Api().post(`education-plan/clone-plan`, {
          id: this.getEducationPlanId,
          user_id : this.$store.state.user
        }).then(() => {
          successAlert("Навчальний план склоновано");
        })
      },

      sendVerify(){
        Api().post(`education-plan/send-verify`, {
          id: this.getEducationPlanId
        }).then(() => {
          successAlert("Навчальний план відправлено на верифікацію");
        })
      },

      verify(){
        Api().post(`education-plan/verify`, {
          id: this.getEducationPlanId
        }).then(() => {
          successAlert("Навчальний план верифіковано");
        })
      },

      refinement(){
        Api().post(`education-plan/refinement`, {
          id: this.getEducationPlanId
        }).then(() => {
          successAlert("Навчальний план відправлено на доопрацювання");
        })
      },

      viewHome(link){
        this.$router.push(link);
      }

    }
  }

</script>
