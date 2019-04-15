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

    // У кого есть желание можете переделать в циклы
    
    worksheet.cell(5, 13, 5, 14, true).string('1').style(myStyle);
    worksheet.cell(5, 15, 5, 16, true).string('2').style(myStyle);
    worksheet.cell(5, 17, 5, 18, true).string('3').style(myStyle);
    worksheet.cell(5, 19, 5, 20, true).string('4').style(myStyle);
    worksheet.cell(5, 21, 5, 22, true).string('5').style(myStyle);
    worksheet.cell(5, 23, 5, 24, true).string('6').style(myStyle);
    worksheet.cell(5, 25, 5, 26, true).string('7').style(myStyle);
    worksheet.cell(5, 27, 5, 28, true).string('8').style(myStyle);
    
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
    var lectures_all = 0;
    var practices_all = 0;
    var laboratores_all = 0;
    var independent_work = 0;

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
              worksheet.cell(11+lineIter, 12+distribution_of_hour[d].dataValues.module_number, 11+lineIter, 12+distribution_of_hour[d].dataValues.module_number, true)
                .number(distribution_of_hour[d].dataValues.value).style(myStyle); // Години
            })
            educationPlans.forEach(function(item, p, educationPlan){
              if (educationPlan[p].dataValues.id == educationItem[e].dataValues.education_plans_id) {
                educationPlanDepartmentName = educationPlan[p].dataValues.department.dataValues.name;
              }
            })
            subjectIter++;
            worksheet.cell(11+lineIter, 1, 11+lineIter, 1, true).number(subjectIter).style(myStyle);
            worksheet.cell(11+lineIter, 2, 11+lineIter, 2, true).string(educationItem[e].dataValues.subject.dataValues.name).style(myStyle); // Назви навчальних дисциплін
            worksheet.cell(11+lineIter, 6, 11+lineIter, 6, true).number(educationItem[e].dataValues.credits).style(myStyle); // Кредити
            worksheet.cell(11+lineIter, 7, 11+lineIter, 7, true).number(educationItem[e].dataValues.credits*30).style(myStyle); // загальний обсяг
            worksheet.cell(11+lineIter, 8, 11+lineIter, 8, true).number(distribution_of_hours*8).style(myStyle); // всього
            distribution_of_hours_all += distribution_of_hours*8;
            worksheet.cell(11+lineIter, 9, 11+lineIter, 9, true).number(educationItem[e].dataValues.lectures).style(myStyle); // Лекції
            lectures_all +=educationItem[e].dataValues.lectures;
            worksheet.cell(11+lineIter, 10, 11+lineIter, 10, true).number(distribution_of_hours*8-educationItem[e].dataValues.lectures).style(myStyle); // практичні, семінарські
            practices_all += distribution_of_hours*8-educationItem[e].dataValues.lectures;
            worksheet.cell(11+lineIter, 11, 11+lineIter, 11, true).number(educationItem[e].dataValues.practice).style(myStyle); // лабораторні
            laboratores_all += educationItem[e].dataValues.practice;
            worksheet.cell(11+lineIter, 12, 11+lineIter, 12, true).number(educationItem[e].dataValues.credits*30-distribution_of_hours*8).style(myStyle); // самостійна робота
            independent_work += educationItem[e].dataValues.credits*30-distribution_of_hours*8;
            worksheet.cell(11+lineIter, 29, 11+lineIter, 29, true).string(educationPlanDepartmentName).style(myStyle); // Кафедра викладання 
            lineIter++;
          }
        })
        subjectIter = 0;
        worksheet.cell(11+lineIter, 2, 11+lineIter, 2, true).string("Усього").style(myStyle);
        worksheet.cell(11+lineIter, 8, 11+lineIter, 8, true).number(distribution_of_hours_all).style(myStyle);  // Всього
        distribution_of_hours_all = 0;
        worksheet.cell(11+lineIter, 9, 11+lineIter, 9, true).number(lectures_all).style(myStyle);  // Всього лекцій
        lectures_all = 0;
        worksheet.cell(11+lineIter, 10, 11+lineIter, 10, true).number(practices_all).style(myStyle);  // Вього практичних, семінарських
        practices_all = 0;
        worksheet.cell(11+lineIter, 11, 11+lineIter, 11, true).number(laboratores_all).style(myStyle);  // Всього лабораторних
        laboratores_all = 0;
        worksheet.cell(11+lineIter, 12, 11+lineIter, 12, true).number(independent_work).style(myStyle);  // Всього самостійна робота
        independent_work = 0;
        lineIter++;
      })
    })
    workbook.write('Excel.xlsx')
    console.log('хорош')
  }
}
module.exports = SavePlanController;