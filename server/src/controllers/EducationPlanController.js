const _ = require('lodash');
const EducationPlan = require('../models/EducationPlan');
const Departmens = require('../models/Departments');
const Subdivision = require('../models/Subdivision');

class EducationPlanController{

    index(req, res){
      EducationPlan.findAll({
        include: [{
          model: Departmens,
          include: [{
            model: Subdivision
          }]
        }]
      })
        .map(el => el.get({ plain: true }))
        .then((response)=>{
          let educationPlans = _.map(response, (item) => {
            return Object.assign(item, {subdivision_id: item.department.subdivision.subdivision_id});
          });
          res.send(educationPlans);
        })
        .catch((err)=>{
          res.send(err);
        })
    }

    store(req, res){
      EducationPlan.create(req.body,{
        include: [Departmens]
      })
        .then((response) => {
          EducationPlan.findOne({
            where: {
              id: response.id,
            },
            include: [{
              model: Departmens
            }]
          })
            .then((response)=>{
              res.send(response)
            })
            .catch((err)=>{
              res.send(err);
            })
        })
        .catch((err) => {
          res.send(err);
        });
    }

    update(req, res){
      EducationPlan.update({
        name: req.body.data.name,
        department_id: req.body.data.department_id,
        year: req.body.data.year
      }, {
        where: {
          id: req.params.id
        }
      }).then((education_planes) => {
        res.send(education_planes);
      }).catch((err) => {
        res.send(err);
      });
    }

    destroy(req, res){
      EducationPlan.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        res.send("EducationPlan was successfully deleted");
      }).catch((err) => {
        res.send(err);
      })
    }

}

module.exports = EducationPlanController;
