const excel = require('excel4node');
const EducationItem = require('../models/EducationItem');
const Subjects = require('../models/Subjects');
const Category = require('../models/Categories');
const SubCategories = require('../models/SubCategories');
const DistributionOfHours = require('../models/DistributionOfHours');
const EducationPlan = require('../models/EducationPlan');
const Departmens = require('../models/Departments');
const Subdivision = require('../models/Subdivision');

// Знаю что код хуйня но по другому пока не придумал!

class SavePlanController {
  async save (req, res) {
    const educationItems = await EducationItem.findAll({
      education_item_id: req.body.id,
      include: [
        { model: Subjects},
        { model: DistributionOfHours}
      ]
    })

    const educationPlans = await EducationPlan.findAll({
      include: [{
        model: Departmens,
        include: [{
          model: Subdivision
        }]
      }]
    })

    const Categories = await Category.findAll({
      include: [
        { model: SubCategories }
      ]
    })

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('План');
    const title = workbook.addWorksheet('Тітул');
    const myStyle = workbook.createStyle({
      alignment: {
        wrapText: true,
        vertical: 'center',
        horizontal: 'center',
      },
      font: {
        size: 8,
        name: 'Times New Roman',
      },
      border: {
        left: {
          style: 'thin',
          color: 'black',
        },
        right: {
          style: 'thin',
          color: 'black',
        },
        top: {
          style: 'thin',
          color: 'black',
        },
        bottom: {
          style: 'thin',
          color: 'black',
        },
        outline: false,
      },
    });

    for(let i = 1; i <= 30; i++) {
      worksheet.column(i).setWidth(3);
      if(i == 2) { worksheet.column(i).setWidth(30); }
      if(i == 29) { worksheet.column(i).setWidth(5); }
      if(i == 30) { worksheet.column(i).setWidth(7); }
    }

    // Шапка

    worksheet.cell(1, 1, 1, 30, true).string('test').style(myStyle);

    worksheet.cell(2, 1, 9, 1, true).string('№').style(myStyle);
    worksheet.cell(2, 2, 9, 2, true).string('Назви навчальних дисциплін').style(myStyle);
    worksheet.cell(2, 3, 2, 5, true).string('Розподіл контрольних заходів за семестрами').style(myStyle);
    
    worksheet.cell(3, 3, 9, 3, true).string('Екзамени').style(myStyle);
    worksheet.cell(3, 4, 9, 4, true).string('Заліки').style(myStyle);
    worksheet.cell(3, 5, 9, 5, true).string('Індивідуальні завдання').style(myStyle);
    
    worksheet.cell(2, 6, 9, 6, true).string('Кількість кредитів ЄКТС').style(myStyle);
    
    worksheet.cell(2, 7, 2, 12, true).string('Кількість годин').style(myStyle);
    worksheet.cell(3, 7, 9, 7, true).string('Загальний обсяг').style(myStyle);
    
    worksheet.cell(3, 8, 3, 11, true).string('аудиторних').style(myStyle);
    worksheet.cell(4, 8, 9, 8, true).string('всього').style(myStyle);
    
    worksheet.cell(4, 9, 4, 11, true).string('у тому числі:').style(myStyle);
    worksheet.cell(5, 9, 5, 11, true).string('');
    
    worksheet.cell(6, 9, 9, 9, true).string('лекції').style(myStyle);
    worksheet.cell(6, 10, 9, 10, true).string('практичні, семінарські').style(myStyle);
    worksheet.cell(6, 11, 9, 11, true).string('лабораторні').style(myStyle);
    
    worksheet.cell(3, 12, 9, 12, true).string('самостійна робота').style(myStyle);
    
    worksheet.cell(2, 13, 2, 28, true).string('Розподіл годин на тиждень за курсами, семестрами і модульними атестаційними циклами').style(myStyle);
    worksheet.cell(3, 13, 3, 16, true).string('1 курс').style(myStyle);
    worksheet.cell(3, 17, 3, 20, true).string('2 курс').style(myStyle);
    worksheet.cell(3, 21, 3, 24, true).string('3 курс').style(myStyle);
    worksheet.cell(3, 25, 3, 28, true).string('4 курс').style(myStyle);
    worksheet.cell(4, 13, 4, 28, true).string('Семестри').style(myStyle);

    for (let i=1;i<=8;i++){
      worksheet.cell(5, 11+i*2, 5, 12+i*2, true).number(i).style(myStyle);
    }
    
    worksheet.cell(6, 13, 6, 28, true).string('Модульні атестаційні цикли').style(myStyle);

    worksheet.cell(7, 13).string('I').style(myStyle);
    worksheet.cell(7, 14).string('II').style(myStyle);
    worksheet.cell(7, 15).string('III').style(myStyle);
    worksheet.cell(7, 16).string('IV').style(myStyle);
    
    worksheet.cell(7, 17).string('I').style(myStyle);
    worksheet.cell(7, 18).string('II').style(myStyle);
    worksheet.cell(7, 19).string('III').style(myStyle);
    worksheet.cell(7, 20).string('IV').style(myStyle);
    
    worksheet.cell(7, 21).string('I').style(myStyle);
    worksheet.cell(7, 22).string('II').style(myStyle);
    worksheet.cell(7, 23).string('III').style(myStyle);
    worksheet.cell(7, 24).string('IV').style(myStyle);
    
    worksheet.cell(7, 25).string('I').style(myStyle);
    worksheet.cell(7, 26).string('II').style(myStyle);
    worksheet.cell(7, 27).string('III').style(myStyle);
    worksheet.cell(7, 28).string('IV').style(myStyle);
  
    worksheet.cell(8, 13, 8, 28, true).string('Кількість тижнів у модульному атестаційному циклі').style(myStyle);
    
    for (let i = 13; i <= 28; i++) {
      worksheet.cell(9, i).number(8).style(myStyle);
    }
    for (let i = 1; i <= 30; i++) {
      worksheet.cell(10, i).number(i).style(myStyle);
    }
    worksheet.cell(2, 29, 9, 29, true).string('Кафедра викладання').style(myStyle);
    worksheet.cell(2, 30, 9, 30, true).string('Потоки').style(myStyle);

    // Шапка

    var lineIter = 0;
    var subjectIter = 0;

    var distribution_of_hours_all = 0;
    var distribution_of_hours_allSubCategory = 0;
    var distribution_of_hours_total = 0;

    var lectures_all = 0;
    var lectures_allSubCategory = 0;
    var lectures_total = 0;

    var practices_all = 0;
    var practices_allSubCategory = 0;
    var practices_total = 0;

    var laboratores_all = 0;
    var laboratores_allSubCategory = 0;
    var laboratores_total = 0;

    var independent_work = 0;
    var independent_work_allSubCategory = 0;
    var independent_work_total = 0;

    var Array_Module = [];
    var Array_Value = [];
    var FullArray = [];
    var LastArr = {};
    var result = {};

    var Array_Module_allSubCategory = [];
    var Array_Value_allSubCategory = [];
    var FullArray_allSubCategory = [];
    var LastArr_allSubCategory = {};
    var result_allSubCategory = {};

    var Array_Module_total = [];
    var Array_Value_total = [];
    var FullArray_total = [];
    var LastArr_total = {};
    var result_total = {};

    Categories.forEach(function(item, i, categories) {
      worksheet.cell(10+lineIter+1, 1, 10+lineIter+1, 30, true).string(i+1 + "." + categories[i].dataValues.name).style(myStyle); // Категорії
      lineIter++;
      categories[i].dataValues.sub_categories.forEach(function(item, j, sub_categories){
        worksheet.cell(11+lineIter, 1, 11+lineIter, 30, true).string(i+1 + "." + (j+1) + " " + sub_categories[j].dataValues.name).style(myStyle); // Підкатегорії
        lineIter++;
        educationItems.forEach(function(item, e, educationItem) {
          if(sub_categories[j].dataValues.sub_category_id == educationItem[e].dataValues.sub_category_id) {
            let distribution_of_hours = 0;
            let educationPlanDepartmentName;
            educationItem[e].dataValues.distribution_of_hours.forEach(function(item, d, distribution_of_hour) {
              distribution_of_hours += distribution_of_hour[d].dataValues.value;
              worksheet.cell(11+lineIter, 12+distribution_of_hour[d].dataValues.module_number).number(distribution_of_hour[d].dataValues.value).style(myStyle); // Години

              //Расчёт сумм часов
              Array_Module.push(distribution_of_hour[d].dataValues.module_number);
              Array_Value.push(distribution_of_hour[d].dataValues.value);
              for (let i=0; i<Array_Module.length; i++) { 
                FullArray[i] = Array.of (Array_Module[i], Array_Value[i]);  
              }
              FullArray.sort(function(a, b) {
                return a[0] == b[0] ? a > b : a[0] > b[0] 
              });
       
              LastArr = FullArray.map(function(x) {
                return {    
                    "m_num": x[0],
                    "hours": x[1]
                }
              })
              // Конечный объект с суммами часов
              result = Object.values(
                LastArr.reduce((a, c) => (
                  a[c.m_num] = a[c.m_num] ?
                  (a[c.m_num].hours += c.hours, a[c.m_num]) :
                  c, a), {}
                )
              );
            })
            educationPlans.forEach(function(item, p, educationPlan){
              if (educationPlan[p].dataValues.id == educationItem[e].dataValues.education_plans_id) {
                educationPlanDepartmentName = educationPlan[p].dataValues.department.dataValues.name;
              }
            })

            subjectIter++;
            worksheet.cell(11+lineIter, 1).number(subjectIter).style(myStyle);
            worksheet.cell(11+lineIter, 2).string(educationItem[e].dataValues.subject.dataValues.name).style(myStyle); // Назви навчальних дисциплін
            worksheet.cell(11+lineIter, 6).number(educationItem[e].dataValues.credits).style(myStyle); // Кредити
            worksheet.cell(11+lineIter, 7).number(educationItem[e].dataValues.credits*30).style(myStyle); // загальний обсяг
            worksheet.cell(11+lineIter, 8).number(distribution_of_hours*8).style(myStyle); // всього
            distribution_of_hours_all += distribution_of_hours*8;
            worksheet.cell(11+lineIter, 9).number(educationItem[e].dataValues.lectures).style(myStyle); // Лекції
            lectures_all +=educationItem[e].dataValues.lectures;
            worksheet.cell(11+lineIter, 10).number(distribution_of_hours*8-educationItem[e].dataValues.lectures).style(myStyle); // практичні, семінарські
            practices_all += distribution_of_hours*8-educationItem[e].dataValues.lectures;
            worksheet.cell(11+lineIter, 11).number(educationItem[e].dataValues.laboratories).style(myStyle); // лабораторні
            laboratores_all += educationItem[e].dataValues.laboratories;
            worksheet.cell(11+lineIter, 12).number(educationItem[e].dataValues.credits*30-distribution_of_hours*8).style(myStyle); // самостійна робота
            independent_work += educationItem[e].dataValues.credits*30-distribution_of_hours*8;
            worksheet.cell(11+lineIter, 29).string(educationPlanDepartmentName).style(myStyle); // Кафедра викладання 
            lineIter++;
            
          }
        })

        subjectIter = 0;
        worksheet.cell(11+lineIter, 1).string("").style(myStyle);
        worksheet.cell(11+lineIter, 2).string("Усього").style(myStyle);
        worksheet.cell(11+lineIter, 8).number(distribution_of_hours_all).style(myStyle);  // Всього
        distribution_of_hours_allSubCategory += distribution_of_hours_all
        distribution_of_hours_all = 0;
        worksheet.cell(11+lineIter, 9).number(lectures_all).style(myStyle);  // Всього лекцій
        lectures_allSubCategory += lectures_all
        lectures_all = 0;
        worksheet.cell(11+lineIter, 10).number(practices_all).style(myStyle);  // Вього практичних, семінарських
        practices_allSubCategory += practices_all
        practices_all = 0;
        worksheet.cell(11+lineIter, 11).number(laboratores_all).style(myStyle);  // Всього лабораторних
        laboratores_allSubCategory += laboratores_all
        laboratores_all = 0;
        worksheet.cell(11+lineIter, 12).number(independent_work).style(myStyle);  // Всього самостійна робота
        independent_work_allSubCategory += independent_work
        independent_work = 0;


        for (let j = 0; j<result.length;j++){
          worksheet.cell(11+lineIter, 12+result[j].m_num).number(result[j].hours).style(myStyle); //Подсчёт часов

              Array_Module_allSubCategory.push(result[j].m_num);
              Array_Value_allSubCategory.push(result[j].hours);
              for (let i=0; i<Array_Module_allSubCategory.length; i++) { 
                FullArray_allSubCategory[i] = Array.of (Array_Module_allSubCategory[i], Array_Value_allSubCategory[i]);  
              }
              FullArray_allSubCategory.sort(function(a, b) {
                return a[0] == b[0] ? a > b : a[0] > b[0] 
              });
       
              LastArr_allSubCategory = FullArray_allSubCategory.map(function(x) {
                return {    
                    "m_num": x[0],
                    "hours": x[1]
                }
              })
              // Конечный объект с суммами часов
              result_allSubCategory = Object.values(
                LastArr_allSubCategory.reduce((a, c) => (
                  a[c.m_num] = a[c.m_num] ?
                  (a[c.m_num].hours += c.hours, a[c.m_num]) :
                  c, a), {}
                )
              );
            
        }
      

        Array_Module = [];
        Array_Value = [];
        FullArray = [];
        LastArr = {};
        result = {};

        lineIter++;
      
      })
      worksheet.cell(11+lineIter, 1).string("").style(myStyle);
      worksheet.cell(11+lineIter, 2).string("Усього за навчальними дисциплінами " + categories[i].dataValues.name.split(" ").splice(-2)).style(myStyle);
      worksheet.cell(11+lineIter, 8).number(distribution_of_hours_allSubCategory).style(myStyle);
      distribution_of_hours_total+=distribution_of_hours_allSubCategory;
      distribution_of_hours_allSubCategory = 0
      worksheet.cell(11+lineIter, 9).number(lectures_allSubCategory).style(myStyle);
      lectures_total+=lectures_allSubCategory;
      lectures_allSubCategory = 0
      worksheet.cell(11+lineIter, 10).number(practices_allSubCategory).style(myStyle);
      practices_total+=practices_allSubCategory;
      practices_allSubCategory = 0;
      worksheet.cell(11+lineIter, 11).number(laboratores_allSubCategory).style(myStyle);
      laboratores_total+=laboratores_allSubCategory;
      laboratores_allSubCategory = 0;
      worksheet.cell(11+lineIter, 12).number(independent_work_allSubCategory).style(myStyle);
      independent_work_total+=independent_work_allSubCategory;
      independent_work_allSubCategory = 0;
      for (let j = 0; j<result_allSubCategory.length;j++){
        worksheet.cell(11+lineIter, 12+result_allSubCategory[j].m_num).number(result_allSubCategory[j].hours).style(myStyle);

        Array_Module_total.push(result_allSubCategory[j].m_num);
        Array_Value_total.push(result_allSubCategory[j].hours);
        for (let i=0; i<Array_Module_total.length; i++) { 
          FullArray_total[i] = Array.of (Array_Module_total[i], Array_Value_total[i]);  
        }
        FullArray_total.sort(function(a, b) {
          return a[0] == b[0] ? a > b : a[0] > b[0] 
        });
 
        LastArr_total = FullArray_total.map(function(x) {
          return {    
              "m_num": x[0],
              "hours": x[1]
          }
        })
        // Конечный объект с суммами часов
        result_total = Object.values(
          LastArr_total.reduce((a, c) => (
            a[c.m_num] = a[c.m_num] ?
            (a[c.m_num].hours += c.hours, a[c.m_num]) :
            c, a), {}
          )
        );
      }
      Array_Module_allSubCategory = [];
        Array_Value_allSubCategory = [];
        FullArray_allSubCategory = [];
        LastArr_allSubCategory = {};
        result_allSubCategory = {};
      lineIter++;
      
    })
    
    worksheet.cell(11+lineIter, 1).string("").style(myStyle);
    worksheet.cell(11+lineIter, 2).string("Загальна кількість").style(myStyle);
    worksheet.cell(11+lineIter, 8).number(distribution_of_hours_total).style(myStyle);
    worksheet.cell(11+lineIter, 9).number(lectures_total).style(myStyle);
    worksheet.cell(11+lineIter, 10).number(practices_total).style(myStyle);
    worksheet.cell(11+lineIter, 11).number(laboratores_total).style(myStyle);
    worksheet.cell(11+lineIter, 12).number(independent_work_total).style(myStyle);
    lineIter++;
    worksheet.cell(11+lineIter, 1).string("").style(myStyle);
    worksheet.cell(11+lineIter, 2, 11+lineIter, 12, true).string("Кількість годин на тиждень").style(myStyle);
    for (let j = 0; j<result_total.length;j++){
      worksheet.cell(11+lineIter, 12+result_total[j].m_num).number(result_total[j].hours).style(myStyle);
    }
    lineIter++;
    worksheet.cell(11+lineIter, 1).string("").style(myStyle);
    worksheet.cell(11+lineIter, 2, 11+lineIter, 12, true).string("Кількість екзаменів").style(myStyle);
    lineIter++;
    worksheet.cell(11+lineIter, 1).string("").style(myStyle);
    worksheet.cell(11+lineIter, 2, 11+lineIter, 12, true).string("Кількість заліків").style(myStyle);
    lineIter++;
    worksheet.cell(11+lineIter, 1).string("").style(myStyle);
    worksheet.cell(11+lineIter, 2, 11+lineIter, 12, true).string("Кількість курсових робіт").style(myStyle);

    workbook.write('Excel.xlsx')
    console.log('хорош')
  }
}
module.exports = SavePlanController;