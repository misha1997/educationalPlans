let _ = require('lodash');
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

}

module.exports = EducationItemController;