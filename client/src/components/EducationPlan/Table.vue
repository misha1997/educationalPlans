<template>
  <div class="mb-5">
      <v-btn color="info" class="mx-0 mb-4" @click="viewItem('/education-plan/' + getEducationPlanId)">Повернутись до роботи з планом</v-btn>
      <v-btn color="info" class="mx-0 mb-4" @click="printData()">Друкувати / Завантажити</v-btn>
    <div class="pb-5" v-html="table"> </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Api from '../../services/Api';
  export default{
    data(){
      return {
        table: ''
      }
    },
    created(){
      this.getData();
    },
    computed:{
      ...mapGetters({
        'getEducationPlanId': 'plan/getEducationPlanId'
      }),
    },
    methods: {
      getData(){
        var result = [];
        var controlRes = [];
        var hours_week = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var exams = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var credit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var course_work = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


        

        Api().post('education-item', {
          id: this.getEducationPlanId
        }).then((response)=>{
          response.data.educationItems.forEach(element => {
            element.distribution_of_hours.forEach(hoursConst => {
              if(hoursConst.form_control == 'credit' || hoursConst.form_control == 'differscore') {
                exams[hoursConst.module_number - 1] += 1
              }
            })
          });

          var sumAll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var sumCycles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var sumHoursCycles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var sumHoursAll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          response.data.data.forEach(function(item, c, cycles) {
            var sumSubCategory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var sumCategory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var sumHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var iter = 0;
            result.push([cycles[c].name.toUpperCase()]) // Назва циклу
            var distributionControls = [0, 0, 0];
            response.data.educationItems.forEach(function(item, e, educationItems) {
              if(educationItems[e].sub_category_id == null && educationItems[e].category_id == null && educationItems[e].cycles_id == cycles[c].cycles_id) {
                educationItems[e].distribution_of_hours.forEach(function(item, dh, distribution_of_hours) {
                  hours[distribution_of_hours[dh].module_number - 1] = distribution_of_hours[dh].value
                  if(distribution_of_hours[dh].individual_tasks != '') {
                    distributionControls[2]++
                  }
                  if(distribution_of_hours[dh].form_control == 'credit') {
                    distributionControls[1]++
                  }
                  if(distribution_of_hours[dh].form_control == 'exam') {
                    distributionControls[0]++
                  }
                })

                iter++
                result.push([
                  iter,
                  educationItems[e].subject.name, 
                  distributionControls[0],
                  distributionControls[1],
                  distributionControls[2],
                  educationItems[e].credits, 
                  educationItems[e].credits*30, 
                  _.sum(hours)*8,
                  educationItems[e].lectures,
                  _.sum(hours)*8-educationItems[e].lectures,
                  educationItems[e].laboratories, 
                  educationItems[e].credits*30-_.sum(hours)*8
                ])
                _.fill(distributionControls, 0);
                for (let h = 0; h < hours.length; h++) {
                  result[result.length-1].push(hours[h]);
                }
                if (educationItems[e].choice == 0) {
                  sumCycles[3] += educationItems[e].credits
                  sumCycles[4] += educationItems[e].credits*30
                  sumCycles[5] += _.sum(hours)*8
                  sumCycles[6] += educationItems[e].lectures
                  sumCycles[7] += _.sum(hours)*8-educationItems[e].lectures
                  sumCycles[8] += educationItems[e].laboratories
                  sumCycles[9] += educationItems[e].credits*30-_.sum(hours)*8
                  for (let i = 0; i < 16; i++) {sumHoursCycles[i] += hours[i]}
                }

              }
            })
            cycles[c].categories.forEach(function(item, cat, categories) {
                result.push([categories[cat].name]) // Назва категорії
                var distributionControls = [0, 0, 0];
                response.data.educationItems.forEach(function(item, e, educationItems) {
                  if(educationItems[e].sub_category_id == null && educationItems[e].category_id == categories[cat].category_id) {
                    educationItems[e].distribution_of_hours.forEach(function(item, dh, distribution_of_hours) {
                      hours[distribution_of_hours[dh].module_number - 1] = distribution_of_hours[dh].value
                      if(distribution_of_hours[dh].individual_tasks != '') {
                        distributionControls[2]++
                      }
                      if(distribution_of_hours[dh].form_control == 'credit') {
                        distributionControls[1]++
                      }
                      if(distribution_of_hours[dh].form_control == 'exam') {
                        distributionControls[0]++
                      }
                    })

                    iter++
                    result.push([
                      iter,
                      educationItems[e].subject.name, 
                      distributionControls[0],
                      distributionControls[1],
                      distributionControls[2],
                      educationItems[e].credits, 
                      educationItems[e].credits*30, 
                      _.sum(hours)*8,
                      educationItems[e].lectures,
                      _.sum(hours)*8-educationItems[e].lectures,
                      educationItems[e].laboratories, 
                      educationItems[e].credits*30-_.sum(hours)*8
                    ])
                    _.fill(distributionControls, 0);
                    for (let h = 0; h < 16; h++) { result[result.length-1].push(hours[h]) }
                    if (educationItems[e].choice == 0) {
                      sumCategory[3] += educationItems[e].credits
                      sumCategory[4] += educationItems[e].credits*30
                      sumCategory[5] += _.sum(hours)*8
                      sumCategory[6] += educationItems[e].lectures
                      sumCategory[7] += _.sum(hours)*8-educationItems[e].lectures
                      sumCategory[8] += educationItems[e].laboratories
                      sumCategory[9] += educationItems[e].credits*30-_.sum(hours)*8
                      sumCycles[3] += educationItems[e].credits
                      sumCycles[4] += educationItems[e].credits*30
                      sumCycles[5] += _.sum(hours)*8
                      sumCycles[6] += educationItems[e].lectures
                      sumCycles[7] += _.sum(hours)*8-educationItems[e].lectures
                      sumCycles[8] += educationItems[e].laboratories
                      sumCycles[9] += educationItems[e].credits*30-_.sum(hours)*8
                      for (let i = 0; i < 16; i++) { sumHours[i] += hours[i] } 
                      _.fill(hours, 0);
                    }

                  }
                })
                iter = 0
                for (let i = 0; i < 16; i++) {
                  sumHoursCycles[i] += sumHours[i]
                }
                if(categories[cat].sub_categories.length == 0) {
                  result.push(_.concat([""],["<b>Усього"], 
                  "","","",
          `<b>`+sumCategory[3]+`</b>`, 
          `<b>`+sumCategory[4]+`</b>`, 
          `<b>`+sumCategory[5]+`</b>`, 
          `<b>`+sumCategory[6]+`</b>`, 
          `<b>`+sumCategory[7]+`</b>`, 
          `<b>`+sumCategory[8]+`</b>`, 
          `<b>`+sumCategory[9]+`</b>`,

          `<b>`+sumHours[0]+`</b>`, 
          `<b>`+sumHours[1]+`</b>`, 
          `<b>`+sumHours[2]+`</b>`, 
          `<b>`+sumHours[3]+`</b>`, 
          `<b>`+sumHours[4]+`</b>`, 
          `<b>`+sumHours[5]+`</b>`, 
          `<b>`+sumHours[6]+`</b>`,
          `<b>`+sumHours[7]+`</b>`, 
          `<b>`+sumHours[8]+`</b>`, 
          `<b>`+sumHours[9]+`</b>`,
          `<b>`+sumHours[10]+`</b>`, 
          `<b>`+sumHours[11]+`</b>`, 
          `<b>`+sumHours[12]+`</b>`, 
          `<b>`+sumHours[13]+`</b>`, 
          `<b>`+sumHours[14]+`</b>`, 
          `<b>`+sumHours[15]+`</b>`))
                  _.fill(sumCategory, 0);
                  _.fill(sumHours, 0);
                }
                categories[cat].sub_categories.forEach(function(item, subCat, sub_categories) {
                  result.push([sub_categories[subCat].name]) // Назва під категорії
                  var distributionControls = [0, 0, 0];
                  response.data.educationItems.forEach(function(item, e, educationItems) {
                    if(educationItems[e].sub_category_id == sub_categories[subCat].sub_category_id) {
                      educationItems[e].distribution_of_hours.forEach(function(item, dh, distribution_of_hours) {
                        hours[distribution_of_hours[dh].module_number - 1] = distribution_of_hours[dh].value
                        if(distribution_of_hours[dh].individual_tasks != '') {
                          distributionControls[2]++
                        }
                        if(distribution_of_hours[dh].form_control == 'credit') {
                          distributionControls[1]++
                        }
                        if(distribution_of_hours[dh].form_control == 'exam') {
                          distributionControls[0]++
                        }
                      })

                      iter++
                      result.push([
                        iter,
                        educationItems[e].subject.name, 
                        distributionControls[0],
                        distributionControls[1],
                        distributionControls[2],
                        educationItems[e].credits, 
                        educationItems[e].credits*30, 
                        _.sum(hours)*8,
                        educationItems[e].lectures,
                        _.sum(hours)*8-educationItems[e].lectures,
                        educationItems[e].laboratories, 
                        educationItems[e].credits*30-_.sum(hours)*8
                      ])
                      _.fill(distributionControls, 0);
                      for (let h = 0; h < hours.length; h++) {
                        result[result.length-1].push(hours[h]);
                      }
                      if (educationItems[e].choice == 0) {
                        sumSubCategory[3] += educationItems[e].credits
                        sumSubCategory[4] += educationItems[e].credits*30
                        sumSubCategory[5] += _.sum(hours)*8
                        sumSubCategory[6] += educationItems[e].lectures
                        sumSubCategory[7] += _.sum(hours)*8-educationItems[e].lectures
                        sumSubCategory[8] += educationItems[e].laboratories
                        sumSubCategory[9] += educationItems[e].credits*30-_.sum(hours)*8
                        sumCycles[3] += educationItems[e].credits
                        sumCycles[4] += educationItems[e].credits*30
                        sumCycles[5] += _.sum(hours)*8
                        sumCycles[6] += educationItems[e].lectures
                        sumCycles[7] += _.sum(hours)*8-educationItems[e].lectures
                        sumCycles[8] += educationItems[e].laboratories
                        sumCycles[9] += educationItems[e].credits*30 - _.sum(hours)*8
                        
                        for (let i = 0; i < 16; i++) {
                          sumHours[i] += hours[i]
                        } 
                        _.fill(hours, 0);
                      }

                    }
                  })
                  iter = 0;
                  for (let i = 0; i < 16; i++) {
                    sumHoursCycles[i] += sumHours[i]
                  }
                  result.push(_.concat([""],["<b>Усього"], 
                    "","","",
          `<b>`+sumSubCategory[3]+`</b>`, 
          `<b>`+sumSubCategory[4]+`</b>`, 
          `<b>`+sumSubCategory[5]+`</b>`, 
          `<b>`+sumSubCategory[6]+`</b>`, 
          `<b>`+sumSubCategory[7]+`</b>`, 
          `<b>`+sumSubCategory[8]+`</b>`, 
          `<b>`+sumSubCategory[9]+`</b>`,

          `<b>`+sumHours[0]+`</b>`, 
          `<b>`+sumHours[1]+`</b>`, 
          `<b>`+sumHours[2]+`</b>`, 
          `<b>`+sumHours[3]+`</b>`, 
          `<b>`+sumHours[4]+`</b>`, 
          `<b>`+sumHours[5]+`</b>`, 
          `<b>`+sumHours[6]+`</b>`,
          `<b>`+sumHours[7]+`</b>`, 
          `<b>`+sumHours[8]+`</b>`, 
          `<b>`+sumHours[9]+`</b>`,
          `<b>`+sumHours[10]+`</b>`, 
          `<b>`+sumHours[11]+`</b>`, 
          `<b>`+sumHours[12]+`</b>`, 
          `<b>`+sumHours[13]+`</b>`, 
          `<b>`+sumHours[14]+`</b>`, 
          `<b>`+sumHours[15]+`</b>`,

                  ));
                  _.fill(sumSubCategory, 0);
                  _.fill(sumHours, 0);
                })
              })
              iter = 0
              if (cycles[c].cycles_id == 1){
              result.push(_.concat([""],["<b>Усього за навчальними дисциплінами загальної підготовки"],   "","","",
          `<b>`+sumCycles[3]+`</b>`, 
          `<b>`+sumCycles[4]+`</b>`, 
          `<b>`+sumCycles[5]+`</b>`, 
          `<b>`+sumCycles[6]+`</b>`, 
          `<b>`+sumCycles[7]+`</b>`, 
          `<b>`+sumCycles[8]+`</b>`, 
          `<b>`+sumCycles[9]+`</b>`,

          `<b>`+sumHoursCycles[0]+`</b>`, 
          `<b>`+sumHoursCycles[1]+`</b>`, 
          `<b>`+sumHoursCycles[2]+`</b>`, 
          `<b>`+sumHoursCycles[3]+`</b>`, 
          `<b>`+sumHoursCycles[4]+`</b>`, 
          `<b>`+sumHoursCycles[5]+`</b>`, 
          `<b>`+sumHoursCycles[6]+`</b>`,
          `<b>`+sumHoursCycles[7]+`</b>`, 
          `<b>`+sumHoursCycles[8]+`</b>`, 
          `<b>`+sumHoursCycles[9]+`</b>`,
          `<b>`+sumHoursCycles[10]+`</b>`, 
          `<b>`+sumHoursCycles[11]+`</b>`, 
          `<b>`+sumHoursCycles[12]+`</b>`, 
          `<b>`+sumHoursCycles[13]+`</b>`, 
          `<b>`+sumHoursCycles[14]+`</b>`, 
          `<b>`+sumHoursCycles[15]+`</b>`,))
              }
              else if (cycles[c].cycles_id == 2){
              result.push(_.concat([""],["<b>Усього за дисциплінами професійної підготовки"],   "","","",
          `<b>`+sumCycles[3]+`</b>`, 
          `<b>`+sumCycles[4]+`</b>`, 
          `<b>`+sumCycles[5]+`</b>`, 
          `<b>`+sumCycles[6]+`</b>`, 
          `<b>`+sumCycles[7]+`</b>`, 
          `<b>`+sumCycles[8]+`</b>`, 
          `<b>`+sumCycles[9]+`</b>`,

          `<b>`+sumHoursCycles[0]+`</b>`, 
          `<b>`+sumHoursCycles[1]+`</b>`, 
          `<b>`+sumHoursCycles[2]+`</b>`, 
          `<b>`+sumHoursCycles[3]+`</b>`, 
          `<b>`+sumHoursCycles[4]+`</b>`, 
          `<b>`+sumHoursCycles[5]+`</b>`, 
          `<b>`+sumHoursCycles[6]+`</b>`,
          `<b>`+sumHoursCycles[7]+`</b>`, 
          `<b>`+sumHoursCycles[8]+`</b>`, 
          `<b>`+sumHoursCycles[9]+`</b>`,
          `<b>`+sumHoursCycles[10]+`</b>`, 
          `<b>`+sumHoursCycles[11]+`</b>`, 
          `<b>`+sumHoursCycles[12]+`</b>`, 
          `<b>`+sumHoursCycles[13]+`</b>`, 
          `<b>`+sumHoursCycles[14]+`</b>`, 
          `<b>`+sumHoursCycles[15]+`</b>`,))
              }
              else if (cycles[c].cycles_id == 3){
              result.push(_.concat([""],["<b>Усього практичної підготовки"],   "","","",
          `<b>`+sumCycles[3]+`</b>`, 
          `<b>`+sumCycles[4]+`</b>`, 
          `<b>`+sumCycles[5]+`</b>`, 
          `<b>`+sumCycles[6]+`</b>`, 
          `<b>`+sumCycles[7]+`</b>`, 
          `<b>`+sumCycles[8]+`</b>`, 
          `<b>`+sumCycles[9]+`</b>`,

          `<b>`+sumHoursCycles[0]+`</b>`, 
          `<b>`+sumHoursCycles[1]+`</b>`, 
          `<b>`+sumHoursCycles[2]+`</b>`, 
          `<b>`+sumHoursCycles[3]+`</b>`, 
          `<b>`+sumHoursCycles[4]+`</b>`, 
          `<b>`+sumHoursCycles[5]+`</b>`, 
          `<b>`+sumHoursCycles[6]+`</b>`,
          `<b>`+sumHoursCycles[7]+`</b>`, 
          `<b>`+sumHoursCycles[8]+`</b>`, 
          `<b>`+sumHoursCycles[9]+`</b>`,
          `<b>`+sumHoursCycles[10]+`</b>`, 
          `<b>`+sumHoursCycles[11]+`</b>`, 
          `<b>`+sumHoursCycles[12]+`</b>`, 
          `<b>`+sumHoursCycles[13]+`</b>`, 
          `<b>`+sumHoursCycles[14]+`</b>`, 
          `<b>`+sumHoursCycles[15]+`</b>`,))
              }
              else if (cycles[c].cycles_id == 4){
              result.push(_.concat([""],["<b>Усього атестації"],   "","","",
          `<b>`+sumCycles[3]+`</b>`, 
          `<b>`+sumCycles[4]+`</b>`, 
          `<b>`+sumCycles[5]+`</b>`, 
          `<b>`+sumCycles[6]+`</b>`, 
          `<b>`+sumCycles[7]+`</b>`, 
          `<b>`+sumCycles[8]+`</b>`, 
          `<b>`+sumCycles[9]+`</b>`,

          `<b>`+sumHoursCycles[0]+`</b>`, 
          `<b>`+sumHoursCycles[1]+`</b>`, 
          `<b>`+sumHoursCycles[2]+`</b>`, 
          `<b>`+sumHoursCycles[3]+`</b>`, 
          `<b>`+sumHoursCycles[4]+`</b>`, 
          `<b>`+sumHoursCycles[5]+`</b>`, 
          `<b>`+sumHoursCycles[6]+`</b>`,
          `<b>`+sumHoursCycles[7]+`</b>`, 
          `<b>`+sumHoursCycles[8]+`</b>`, 
          `<b>`+sumHoursCycles[9]+`</b>`,
          `<b>`+sumHoursCycles[10]+`</b>`, 
          `<b>`+sumHoursCycles[11]+`</b>`, 
          `<b>`+sumHoursCycles[12]+`</b>`, 
          `<b>`+sumHoursCycles[13]+`</b>`, 
          `<b>`+sumHoursCycles[14]+`</b>`, 
          `<b>`+sumHoursCycles[15]+`</b>`,))
              }
              else{
                result.push(_.concat([""],["<b>Усього за "+cycles[c].name.toLowerCase()], 
                "","","",
          `<b>`+sumCycles[3]+`</b>`, 
          `<b>`+sumCycles[4]+`</b>`, 
          `<b>`+sumCycles[5]+`</b>`, 
          `<b>`+sumCycles[6]+`</b>`, 
          `<b>`+sumCycles[7]+`</b>`, 
          `<b>`+sumCycles[8]+`</b>`, 
          `<b>`+sumCycles[9]+`</b>`,

          `<b>`+sumHoursCycles[0]+`</b>`, 
          `<b>`+sumHoursCycles[1]+`</b>`, 
          `<b>`+sumHoursCycles[2]+`</b>`, 
          `<b>`+sumHoursCycles[3]+`</b>`, 
          `<b>`+sumHoursCycles[4]+`</b>`, 
          `<b>`+sumHoursCycles[5]+`</b>`, 
          `<b>`+sumHoursCycles[6]+`</b>`,
          `<b>`+sumHoursCycles[7]+`</b>`, 
          `<b>`+sumHoursCycles[8]+`</b>`, 
          `<b>`+sumHoursCycles[9]+`</b>`,
          `<b>`+sumHoursCycles[10]+`</b>`, 
          `<b>`+sumHoursCycles[11]+`</b>`, 
          `<b>`+sumHoursCycles[12]+`</b>`, 
          `<b>`+sumHoursCycles[13]+`</b>`, 
          `<b>`+sumHoursCycles[14]+`</b>`, 
          `<b>`+sumHoursCycles[15]+`</b>`, 
                ))
              }
              for(let i = 0; i <= 9; i++) {
                sumAll[i] += sumCycles[i]
              }
              for(let i = 0; i < 16; i++) {
                sumHoursAll[i] += sumHoursCycles[i]
              }
              _.fill(sumCycles, 0);
              _.fill(sumHoursCycles, 0);
          })
          result.push(_.concat([""],["<b>Загальна кількість"], 
          "","","",
          `<b>`+sumAll[3]+`</b>`, 
          `<b>`+sumAll[4]+`</b>`, 
          `<b>`+sumAll[5]+`</b>`, 
          `<b>`+sumAll[6]+`</b>`, 
          `<b>`+sumAll[7]+`</b>`, 
          `<b>`+sumAll[8]+`</b>`, 
          `<b>`+sumAll[9]+`</b>`,

          `<b>`+sumHoursAll[0]+`</b>`, 
          `<b>`+sumHoursAll[1]+`</b>`, 
          `<b>`+sumHoursAll[2]+`</b>`, 
          `<b>`+sumHoursAll[3]+`</b>`, 
          `<b>`+sumHoursAll[4]+`</b>`, 
          `<b>`+sumHoursAll[5]+`</b>`, 
          `<b>`+sumHoursAll[6]+`</b>`,
          `<b>`+sumHoursAll[7]+`</b>`, 
          `<b>`+sumHoursAll[8]+`</b>`, 
          `<b>`+sumHoursAll[9]+`</b>`,
          `<b>`+sumHoursAll[10]+`</b>`, 
          `<b>`+sumHoursAll[11]+`</b>`, 
          `<b>`+sumHoursAll[12]+`</b>`, 
          `<b>`+sumHoursAll[13]+`</b>`, 
          `<b>`+sumHoursAll[14]+`</b>`, 
          `<b>`+sumHoursAll[15]+`</b>`, 
          
          
          ))
          Api().get(`plan-controls/${this.getEducationPlanId}`).then((response)=>{
            response.data.forEach(function(item, cont, controls) {
              hours_week[controls[cont].module_number - 1] = controls[cont].hours_week
              credit[controls[cont].module_number - 1] = controls[cont].credit
              course_work[controls[cont].module_number - 1] = controls[cont].course_work
            });
            controlRes.push(
              _.concat([""], ["Кількість годин на тиждень"], hours_week), 
              _.concat([""], ["Кількість іспитів"], credit), 
              _.concat([""], ["Кількість заліків"], exams), 
              _.concat([""], ["Кількість курсових робіт</b>"], course_work))
          }).then(() => {
            Api().get(`education-plan/${this.getEducationPlanId}`).then((response)=>{
              const dataPlan = {
                subdivision: response.data[0].department.subdivision.name,
                year: response.data[0].year,
                qualification: response.data[0].qualification,
                discipline: response.data[0].discipline,
                specialty: response.data[0].specialty,
                specialization: response.data[0].specialization,
                educational_program: response.data[0].educational_program,
                educational_level: response.data[0].educational_level,
                form_study: response.data[0].form_study,
                training_period: response.data[0].training_period
              }
              this.table = makeTableHTML(result, dataPlan, controlRes)
            });
          })
        })
        function makeTableHTML(myArray, dataPlan, controlRes) {
          var result = 
          `<table width="100%">
              <tr>
                <td colspan="2" align="center"><b>СУМСЬКИЙ ДЕРЖАВНИЙ УНІВЕРСИТЕТ</b></td>
              </tr>
              <tr>
                <td colspan="2" align="center"><b>${dataPlan.subdivision}</b></td>
              </tr>
              <tr>
                <td colspan="2">
                  Затверджено рішенням вченої ради.<br>
                  <p style="margin-top: 9pt; margin-bottom: 9pt">Протокол від ____.___________._____ р. № ____</p>
                  <div style="float: left; width: auto">Голова ради  ________________ <br>
                  <span style="margin-top:-1pt; font-size: 8pt; margin-left: 130px;">(підпис)</span></div>

                  <div style='float: left; width: 15%; text-align: center'>___________________
                  <div style='margin-top:-1pt; font-size: 8pt; text-align: center'>(прізвище та ініціали)</div>
                  </div>
                  </div>
                  <div style="clear: both"></div>
                  <div style="margin-top: 10pt">______ ________________________ ________ р.<br>
                  <span style="margin-left: 130px;">М.П.</span></div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center"><b>НАВЧАЛЬНИЙ ПЛАН</b><br><br></td>
              </tr>
              <tr>
                <td width="50%" style='vertical-align: top;line-height: 1.8;'>
                  <b>Галузь знань</b> ${dataPlan.discipline}<br>
                  <b>Спеціальність</b> ${dataPlan.specialty}<br>
                  <b>Спеціалізація</b> ${dataPlan.specialization}<br>
                  <b>Освітня програма</b> ${dataPlan.educational_program}<br>
                  <b>Освітній (освітньо-науковий) рівень</b> ${dataPlan.educational_level}<br>
                </td>
                <td width="50%" style='vertical-align: top;line-height: 1.8;'>
                  <b>Кваліфікація</b> ${dataPlan.qualification.toLowerCase()} з ${dataPlan.specialty}<br>
                  <b>Термін навчання</b> ${dataPlan.training_period}<br>
                  <b>Форма навчання</b> ${dataPlan.form_study}<br>
                  <b>Рік прийому</b> ${dataPlan.year}<br>
                </td>
              </tr>
            </table>
            <br>
            <table cellspacing='1' cellpadding=3 border="1" id='printTable' style='width: 100%; border-collapse: collapse; border: 0.1px solid black; margin: 0 auto;font-size:14px'>
              <tr>
                <td rowspan=8 align='center' style="white-space: nowrap  "><b>№ п/п</b></td>
                <td rowspan=8 align='center' style="white-space: nowrap  "><b>Назви навчальних дисциплін</b></td>
                <td colspan=3 align='center' style="white-space: nowrap  "><b>Розподіл контрольних заходів <br>за семестрами</b></td>
                <td rowspan=8 align='center' style='transform: rotate(-90deg);'><b>Кількість кредитів ЄКТС</b></td></td>
                <td colspan=6 align='center'><b>Кількість годин</b></td>
                <td colspan=16 align='center'><b>Розподіл годин на тиждень за курсами, семестрами і модульними атестаційними циклами</b></td>
              </tr>
              <tr>
                <td rowspan=7 style='transform: rotate(-90deg);'><b>Екзамен</b></td>
                <td rowspan=7 style='transform: rotate(-90deg);'><b>Залік</b></td>
                <td rowspan=7 align='center' style='transform: rotate(-90deg);'><b>Індивідуальні завдання</b></td>
                <td rowspan=7 style='transform: rotate(-90deg);' align='center'><b>Загальний обсяг</b></td>
                <td colspan=4 align='center'><b>Аудиторних</b></td>
                <td rowspan=7 align='center' style='transform: rotate(-90deg); white-space: nowrap'><b>Самостійна робота</b></td>
                <td colspan=4 align='center'>1 курс</td>
                <td colspan=4 align='center'>2 курс</td>
                <td colspan=4 align='center'>3 курс</td>
                <td colspan=4 align='center'>4 курс</td>
                </tr>
              <tr>
                <td rowspan=6 style='transform: rotate(-90deg);'><b>Всього</b></td>
                <td colspan=3 align='center'><b>у тому числі:</b></td>
                <td colspan=16 align='center'><b>Семестри</b></td>
                </tr>
              <tr>
                <td rowspan=5 style='transform: rotate(-90deg);'><b>Лекції</b></td>
                <td rowspan=5 align='center' style='transform: rotate(-90deg);'><b>Практичні (сем.)</b></td>
                <td rowspan=5 style='transform: rotate(-90deg);'><b>Лабораторні</b></td>
                
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">1</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">2</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">3</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">4</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">5</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">6</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">7</td>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                </tr>
             <tr><td colspan=16 align='center'><b>Модульні атестаційні цикли</b></td></tr>
              <tr>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I</td><td style='padding: 3.5pt; font-size: 8pt' align="center">II</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III</td><td style='padding: 3.5pt; font-size: 8pt' align="center">IV</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I</td><td style='padding: 3.5pt; font-size: 8pt' align="center">II</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III</td><td style='padding: 3.5pt; font-size: 8pt'align="center">IV</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I</td><td style='padding: 3.5pt; font-size: 8pt' align="center">II</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III</td><td style='padding: 3.5pt; font-size: 8pt' align="center">IV</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I</td><td style='padding: 3.5pt; font-size: 8pt' align="center">II</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III</td><td style='padding: 3.5pt; font-size: 8pt' align="center">IV</td>
                </tr>
              <tr>
                <td colspan=16 align='center'><b>Кількість тижнів у модульному атестаційному циклі</b></td>
                </tr>
              <tr>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                </tr>
              <tr>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">1</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">2</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">3</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">4</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">5</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">6</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">7</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">9</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">10</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">11</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">12</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">13</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">14</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">15</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">16</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">17</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">18</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">19</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">20</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">21</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">22</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">23</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">24</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">25</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">26</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">27</td>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">28</td>
                </tr>`;

              for(var i=0; i<myArray.length; i++) {
                  result += `<tr>`;
                  for(var j=0; j<myArray[i].length; j++){
                      if(myArray[i].length == 1) {
                        result += `<td colspan='28' align='center'><b>${myArray[i][j]}</b></td>`;
                      } else {
                        if (j!=1){
                        result += `<td align='center' style="font-size: 9pt;">${myArray[i][j]}</td>`;
                        }
                        else{
                          result += `<td style="padding: 2pt 3pt;">${myArray[i][j]}</td>`;
                        }
                      }
                  }
                  result += `</tr>`;
              }
              for(var i=0; i<controlRes.length; i++) {
                  result += `<tr>`;
                  for(var j=0; j<controlRes[i].length; j++){
                    if(isNaN(controlRes[1][j])) {
                      result += `<td colspan=11 style="padding-left: 2pt"><b>${controlRes[i][j]}</b></td>`;
                    } else {
                      result += `<td align="center" style="font-size: 9pt"><b>${controlRes[i][j]}</b></td>`;
                    }
                  }
                  result += `</tr>`;
              }
              result += `</table>`;

            result += "<div style='width: 100%; margin-top: 24pt'><div style='float: left; width: 46%'>Декан факультету/Директор інституту</div>"
            result += "<div style='float: left; width: 5%; text-align: center'>_________<div style='margin-top:-1pt; padding-left: 12pt; font-size: 8pt; text-align: center'>(підпис)</div></div></div><div style='clear: both'></div>";
            result += "<div style='width: 100%; margin-top: 12pt'><div style='float: left; width: 46%'>Завідувач кафедри із спеціальної (фахової) підготовки</div>"
            result += "<div style='float: left; width: 5%; margin-top: 12pt'>_________<div style='margin-top:-1pt; padding-left: 12pt; font-size: 8pt; text-align: center'>(підпис)</div></div>";
            result += "<div style='float: left; margin-left: 5%; width: 15%; margin-top: 12pt'; text-align: center'>___________________<div style='margin-top:-1pt; font-size: 8pt; text-align: center'>(прізвище та ініціали)</div></div>";
            result += "<div style='width: 100%; margin-top: 12pt'><div style='float: left; width: 46%'>Керівник робочої проектної групи</div>"
            result += "<div style='float: left; width: 5%; margin-top: 12pt'>_________<div style='margin-top:-1pt; padding-left: 12pt; font-size: 8pt; text-align: center'>(підпис)</div></div>";
            result += "<div style='float: left; margin-left: 5%; width: 15%; margin-top: 12pt'; text-align: center'>___________________<div style='margin-top:-1pt; font-size: 8pt; text-align: center'>(прізвище та ініціали)</div></div><div style='clear: both'></div>";
            result += "<div style='width: 100%; margin-top: 10pt'>ПОГОДЖЕНО:</div>"
            result += "<div style='width: 100%;'><div style='float: left; width: 46%'>Начальник організаційно-методичного управління </div>"
            result += "<div style='float: left; width: 5%'>_________<div style='margin-top:-1pt; font-size: 8pt; padding-left: 12pt; text-align: center'>(підпис)</div></div>";
            result += "<div style='float: left; margin-left: 5%; width: 15%; text-align: center'>___________________<div style='margin-top:-1pt; font-size: 8pt; text-align: center'>(прізвище та ініціали)</div></div></div>";
            return result;
        }
      },
      printData() {
        document.write(this.table);
        window.print();
        location.reload();
      },
      viewItem(link){
        this.$router.push(link);
      }
    }
  }
</script>
<style>

</style>
