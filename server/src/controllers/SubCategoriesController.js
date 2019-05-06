const _ = require('lodash');
const SubCategories = require('../models/SubCategories');
const Categories = require('../models/Categories');

class SubCategoriesController{

  index(req, res){
    SubCategories.findAll({
      include: [{
        model: Categories
      }]
    }).map(el => el.get({ plain: true }))
      .then((response)=>{
        let sub_category = _.map(response, (item) => {
          return Object.assign(item, {category_id: item.category_id});
        });
        res.send(sub_category);
      })
      .catch((err)=>{
        res.send(err);
      })
  }

  store(req, res){
    SubCategories.create(req.body,{
      include: [Categories]
    })
      .then((response) => {
        SubCategories.findOne({
          where: {
            sub_category_id: response.sub_category_id,
          },
          include: [{
            model: Categories
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
    SubCategories.findAll({
      where: {category_id: req.params.id}
    })
      .then((response)=>{
        res.send(response);
      })
      .catch((err)=>{
        res.send(err);
      })
  }

  update(req, res){
    SubCategories.update({
      name: req.body.data.name,
      category_id: req.body.data.category_id
    }, {
      where: {
        sub_category_id: req.params.id
      }
    }).then((subcategories) => {
      res.send(subcategories);
    }).catch((err) => {
      res.send(err);
    });
  }
  
  destroy(req, res){
    SubCategories.destroy({
      where: {
        sub_category_id: req.params.id
      }
    }).then(() => {
      res.send("SubCategories was successfully deleted");
    }).catch((err) => {
      res.send(err);
    })
  }
}

module.exports = SubCategoriesController;
