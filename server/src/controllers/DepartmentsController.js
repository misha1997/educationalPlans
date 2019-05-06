const _ = require('lodash');
const Departments = require('../models/Departments');
const Subdivision = require('../models/Subdivision');

class DepartmentsController{

  index(req, res){
    Departments.findAll({
      include: [{
        model: Subdivision
      }]
    }).map(el => el.get({ plain: true }))
      .then((response)=>{
        let departments = _.map(response, (item) => {
          return Object.assign(item, {subdivision_id: item.subdivision_id});
        });
        res.send(departments);
      })
      .catch((err)=>{
        res.send(err);
      })
  }

  store(req, res){
    Departments.create(req.body,{
      include: [Subdivision]
    })
      .then((response) => {
        Departments.findOne({
          where: {
            department_id: response.department_id,
          },
          include: [{
            model: Subdivision
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

  show(req, res){
    Departments.findAll({
      where: {subdivision_id: req.params.id}
    })
      .then((response)=>{
        res.send(response);
      })
      .catch((err)=>{
        res.send(err);
      })
  }

  update(req, res){
    Departments.update({
      name: req.body.data.name,
      subdivision_id: req.body.data.subdivision_id,
    }, {
      where: {
        department_id: req.params.id
      }
    }).then((department) => {
      res.send(department);
    }).catch((err) => {
      res.send(err);
    });
  }
  
  destroy(req, res){
    Departments.destroy({
      where: {
        department_id: req.params.id
      }
    }).then(() => {
      res.send("Departments was successfully deleted");
    }).catch((err) => {
      res.send(err);
    })
  }
}

module.exports = DepartmentsController;
