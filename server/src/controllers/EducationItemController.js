let _ = require('lodash');

const excel = require('excel4node');

const EducationItem = require('../models/EducationItem');
const Subjects = require('../models/Subjects');
const Categories = require('../models/Categories');
const SubCategories = require('../models/SubCategories');
const DistributionOfHours = require('../models/DistributionOfHours');


class EducationItemController{
  index(req, res){
    let seriesRequests = async (req, res) => {
      try{

        let data = await Categories.findAll({
          include: [
            { model: SubCategories },
          ]
        });

        let educationItems = await EducationItem.findAll({
          education_item_id: req.body.id,
          include: [
            { model: Subjects},
            { model: DistributionOfHours}
          ]
        })

        res.send({
          'data': data,
          'educationItems': educationItems
        });

      }catch(err){
        res.send(err);
      }
    }
    seriesRequests(req, res);
  }

  store(req, res){
    EducationItem.create(req.body).then((response) => {
        EducationItem.find({
          where: {
            education_item_id: response.education_item_id
          },
          include: {
            model: Subjects
          }
        })
          .then((response)=>{
            res.send(response);
          })
          .catch((err)=>{
            res.send(err);
          })

      })
      .catch((err) => {
        res.send(err);
      })
  }

  updateLearningPlan(req, res){
    EducationItem.update({
      lectures: parseInt(req.body.lectures),
      practice: parseInt(req.body.practice),
      laboratories: parseInt(req.body.laboratories)
    }, {
      where: {
        education_item_id: req.params.id
      }
    })
      .then((response) => {
        EducationItem.findOne({
          where: {
            education_item_id: req.params.id
          }
        })
          .then((response)=>{
            res.send(response);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      })
  }

  destroy(req, res){
    EducationItem.destroy({
      where: {
        education_item_id: req.params.id
      }
    })
      .then(() => {
        res.send("Education item was successfully deleted");
      })
      .catch((err) => {
        res.send(err);
      })
  }

  save(req, res){
    let seriesRequests = async (req, res) => {
      try{

        var data = await Categories.findAll({
          include: [
            { model: SubCategories },
          ]
        });

        let educationItems = await EducationItem.findAll({
          education_item_id: req.body.id,
          include: [
            { model: Subjects},
            { model: DistributionOfHours}
          ]
        })

        var workbook = new excel.Workbook();
        var worksheet = workbook.addWorksheet('План');
        var myStyle = workbook.createStyle({
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
        worksheet.column(1).setWidth(3);
        worksheet.column(2).setWidth(30);
        worksheet.column(3).setWidth(3);
        worksheet.column(4).setWidth(3);
        worksheet.column(5).setWidth(3);
        worksheet.column(6).setWidth(3);
        worksheet.column(7).setWidth(3);
        worksheet.column(8).setWidth(3);
        worksheet.column(9).setWidth(3);
        worksheet.column(10).setWidth(3);
        worksheet.column(11).setWidth(3);
        worksheet.column(12).setWidth(3);
        worksheet.column(13).setWidth(3);
        worksheet.column(14).setWidth(3);
        worksheet.column(15).setWidth(3);
        worksheet.column(16).setWidth(3);
        worksheet.column(17).setWidth(3);
        worksheet.column(18).setWidth(3);
        worksheet.column(19).setWidth(3);
        worksheet.column(20).setWidth(3);
        worksheet.column(21).setWidth(3);
        worksheet.column(22).setWidth(3);
        worksheet.column(23).setWidth(3);
        worksheet.column(24).setWidth(3);
        worksheet.column(25).setWidth(3);
        worksheet.column(26).setWidth(3);
        worksheet.column(27).setWidth(3);
        worksheet.column(28).setWidth(3);
        worksheet.column(29).setWidth(5);
        worksheet.column(30).setWidth(7);
        worksheet.cell(1, 1, 1, 28, true).string('V. ПЛАН НАВЧАЛЬНОГО ПРОЦЕСУ').style(myStyle);

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
        
        worksheet.cell(9, 13).string('8').style(myStyle);
        worksheet.cell(9, 14).string('8').style(myStyle);
        worksheet.cell(9, 15).string('8').style(myStyle);
        worksheet.cell(9, 16).string('8').style(myStyle);
        worksheet.cell(9, 17).string('8').style(myStyle);
        worksheet.cell(9, 18).string('8').style(myStyle);
        worksheet.cell(9, 19).string('8').style(myStyle);
        worksheet.cell(9, 20).string('8').style(myStyle);
        worksheet.cell(9, 21).string('8').style(myStyle);
        worksheet.cell(9, 22).string('8').style(myStyle);
        worksheet.cell(9, 23).string('8').style(myStyle);
        worksheet.cell(9, 24).string('8').style(myStyle);
        worksheet.cell(9, 25).string('8').style(myStyle);
        worksheet.cell(9, 26).string('8').style(myStyle);
        worksheet.cell(9, 27).string('8').style(myStyle);
        worksheet.cell(9, 28).string('8').style(myStyle);
        
        worksheet.cell(2, 29, 9, 29, true).string('Кафедра викладання').style(myStyle);
        worksheet.cell(2, 30, 9, 30, true).string('Потоки').style(myStyle);

        var ff = 0;
        var sum_distribution_of_hours = 0;

        for(let i = 0; i < 1; i++) {
          ff++
          worksheet.cell(9+ff, 1, 9+ff, 30, true).string(data[i].dataValues.name).style(myStyle);
          for(let i = 0; i < data[i].dataValues.sub_categories.length; i++) {
            worksheet.cell(10+ff, 1, 10+ff, 30, true).string(data[i].dataValues.sub_categories[i].dataValues.name).style(myStyle);
          }
        }
        for(let i = 0; i < educationItems.length; i++) {

          for(let j = 0; j < educationItems[i].distribution_of_hours.length; j++) {
            sum_distribution_of_hours += educationItems[i].distribution_of_hours[j].dataValues.value;
            worksheet.cell(12, 13+j, 12, 13+j, true).string(""+educationItems[i].distribution_of_hours[j].dataValues.value+"").style(myStyle);
          }
          worksheet.cell(12+i, 1, 12+i, 1, true).string(""+i+"").style(myStyle);
          worksheet.cell(12+i, 2, 12+i, 2, true).string(educationItems[i].subject.dataValues.name);

          worksheet.cell(12+i, 6, 12+i, 6, true).string(""+educationItems[i].credits+"").style(myStyle);
          worksheet.cell(12+i, 7, 12+i, 7, true).string(""+educationItems[i].credits*30+"").style(myStyle);
          worksheet.cell(12+i, 8, 12+i, 8, true).string(""+sum_distribution_of_hours*8+"").style(myStyle);
          worksheet.cell(12+i, 9, 12+i, 9, true).string(""+educationItems[i].lectures+"").style(myStyle);
          worksheet.cell(12+i, 10, 12+i, 10, true).string(""+educationItems[i].practice+"").style(myStyle);
          worksheet.cell(12+i, 11, 12+i, 11, true).string(""+educationItems[i].laboratories+"").style(myStyle);

          sum_distribution_of_hours = 0;

        }

        workbook.write('Excel.xlsx');

      }catch(err){
        res.send(err);
      }
    }
    seriesRequests(req, res);
  }

}

module.exports = EducationItemController;
