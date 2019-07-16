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
                  result.push(_.concat([""],["Усього"], sumCategory, sumHours))
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
                  result.push(_.concat([""],["Усього"], sumSubCategory, sumHours));
                  _.fill(sumSubCategory, 0);
                  _.fill(sumHours, 0);
                })
              })
              iter = 0
              if (cycles[c].cycles_id == 1){
              result.push(_.concat([""],["Усього за навчальними дисциплінами загальної підготовки"], sumCycles, sumHoursCycles))
              }
              else if (cycles[c].cycles_id == 2){
              result.push(_.concat([""],["Усього за дисциплінами професійної підготовки"], sumCycles, sumHoursCycles))
              }
              else if (cycles[c].cycles_id == 3){
              result.push(_.concat([""],["Усього практичної підготовки"], sumCycles, sumHoursCycles))
              }
              else if (cycles[c].cycles_id == 4){
              result.push(_.concat([""],["Усього атестації"], sumCycles, sumHoursCycles))
              }
              else{
                result.push(_.concat([""],["Усього за "+cycles[c].name.toLowerCase()], sumCycles, sumHoursCycles))
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
          result.push(_.concat([""],["Загальна кількість"], sumAll, sumHoursAll))
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
              _.concat([""], ["Кількість курсових робіт"], course_work))
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
                  Протокол від ____.___________._____р. № ____<br>
                  Голова ради ________________ А. В. Васильєв<br>
                  <span style="margin-left: 120px;">(підпис)</span><br>
                  ______ ________________________ ________ р.<br>
                  <span style="margin-left: 130px;">М.П.</span>
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
            <table cellspacing='0' id='printTable' style='width: 100%; border-collapse: collapse; margin: 0 auto;font-size:14px' border=1>
              <tr>
                <td rowspan=8>№
                <td rowspan=8 align='center'>назви навчальних дисциплін
                <td colspan=3 align='center'>розподіл контрольних заходів за семестрами
                <td rowspan=8 align='center' style='transform: rotate(-90deg);'>кількість кредитів ЄКТС</td>
                <td colspan=6 align='center'>кількість годин
                <td colspan=16 align='center'>розподіл годин на тиждень за курсами, семестрами і модульними атестаційними циклами
              </tr>
              <tr>
                <td rowspan=7 style='transform: rotate(-90deg);'>іспити
                <td rowspan=7 style='transform: rotate(-90deg);'>заліки
                <td rowspan=7 align='center' style='transform: rotate(-90deg);'>індивідуальні завдання
                <td rowspan=7 style='transform: rotate(-90deg);' align='center'>загальний обсяг
                <td colspan=4 align='center'>аудиторних
                <td rowspan=7 align='center' style='transform: rotate(-90deg);'>самостійна робота
                <td colspan=4 align='center'>1 курс
                <td colspan=4 align='center'>2 курс
                <td colspan=4 align='center'>3 курс
                <td colspan=4 align='center'>4 курс
                </tr>
              <tr>
                <td rowspan=6 style='transform: rotate(-90deg);'>всього
                <td colspan=3 align='center'>у тому числі:
                <td colspan=16 align='center'>семестри
                </tr>
              <tr>
                <td colspan=3>
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">1
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">2
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">3
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">4
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">5
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">6
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">7
                <td colspan=2 style='padding: 3.5pt; font-size: 8pt' align="center">8
                </tr>
              <tr>
                <td rowspan=4 style='transform: rotate(-90deg);'>лекції
                <td rowspan=4 align='center' style='transform: rotate(-90deg);'>практичні, семінарські
                <td rowspan=4 style='transform: rotate(-90deg);'>лабораторні
                <td colspan=16 align='center'>модульні атестаційні цикли
                </tr>
              <tr>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I<td style='padding: 3.5pt; font-size: 8pt' align="center">II
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III<td style='padding: 3.5pt; font-size: 8pt' align="center">IV
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I<td style='padding: 3.5pt; font-size: 8pt' align="center">II
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III<td style='padding: 3.5pt; font-size: 8pt'align="center">IV
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I<td style='padding: 3.5pt; font-size: 8pt' align="center">II
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III<td style='padding: 3.5pt; font-size: 8pt' align="center">IV
                <td style='padding: 3.5pt; font-size: 8pt' align="center">I<td style='padding: 3.5pt; font-size: 8pt' align="center">II
                <td style='padding: 3.5pt; font-size: 8pt' align="center">III<td style='padding: 3.5pt; font-size: 8pt' align="center">IV
                </tr>
              <tr>
                <td colspan=16 align='center'>кількість тижнів у модульному атестаційному циклі
                </tr>
              <tr>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                </tr>
              <tr>
                <td style='padding: 3.5pt; font-size: 8pt' align="center">1
                <td style='padding: 3.5pt; font-size: 8pt' align="center">2
                <td style='padding: 3.5pt; font-size: 8pt' align="center">3
                <td style='padding: 3.5pt; font-size: 8pt' align="center">4
                <td style='padding: 3.5pt; font-size: 8pt' align="center">5
                <td style='padding: 3.5pt; font-size: 8pt' align="center">6
                <td style='padding: 3.5pt; font-size: 8pt' align="center">7
                <td style='padding: 3.5pt; font-size: 8pt' align="center">8
                <td style='padding: 3.5pt; font-size: 8pt' align="center">9
                <td style='padding: 3.5pt; font-size: 8pt' align="center">10
                <td style='padding: 3.5pt; font-size: 8pt' align="center">11
                <td style='padding: 3.5pt; font-size: 8pt' align="center">12
                <td style='padding: 3.5pt; font-size: 8pt' align="center">13
                <td style='padding: 3.5pt; font-size: 8pt' align="center">14
                <td style='padding: 3.5pt; font-size: 8pt' align="center">15
                <td style='padding: 3.5pt; font-size: 8pt' align="center">16
                <td style='padding: 3.5pt; font-size: 8pt' align="center">17
                <td style='padding: 3.5pt; font-size: 8pt' align="center">18
                <td style='padding: 3.5pt; font-size: 8pt' align="center">19
                <td style='padding: 3.5pt; font-size: 8pt' align="center">20
                <td style='padding: 3.5pt; font-size: 8pt' align="center">21
                <td style='padding: 3.5pt; font-size: 8pt' align="center">22
                <td style='padding: 3.5pt; font-size: 8pt' align="center">23
                <td style='padding: 3.5pt; font-size: 8pt' align="center">24
                <td style='padding: 3.5pt; font-size: 8pt' align="center">25
                <td style='padding: 3.5pt; font-size: 8pt' align="center">26
                <td style='padding: 3.5pt; font-size: 8pt' align="center">27
                <td style='padding: 3.5pt; font-size: 8pt' align="center">28
                </tr>`;

              for(var i=0; i<myArray.length; i++) {
                  result += `<tr>`;
                  for(var j=0; j<myArray[i].length; j++){
                      if(myArray[i].length == 1) {
                        result += `<td colspan='30' align='center'>${myArray[i][j]}</td>`;
                      } else {
                        if (j!=1){
                        result += `<td align='center'>${myArray[i][j]}</td>`;
                        }
                        else{
                          result += `<td style="padding-left: 2pt">${myArray[i][j]}</td>`;
                        }
                      }
                  }
                  result += `</tr>`;
              }
              for(var i=0; i<controlRes.length; i++) {
                  result += `<tr>`;
                  for(var j=0; j<controlRes[i].length; j++){
                    if(isNaN(controlRes[1][j])) {
                      result += `<td colspan=11 style="padding-left: 2pt">${controlRes[i][j]}</td>`;
                    } else {
                      result += `<td align="center">${controlRes[i][j]}</td>`;
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