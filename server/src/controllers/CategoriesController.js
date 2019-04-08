const Categories = require('../models/Categories');

class CategoriesController{

  index(req, res){
    Categories.findAll().then((categories) => {
      res.send(categories);
    }).catch((err) => {
      res.send(err);
    });
  }

  show(req, res){
    Categories.findAll({
      where: {
        category_id: req.params.id
      }
    }).then((category) => {
      res.send(category);
    }).catch((err) => {
      res.send(err);
    });
  }

  store(req,res){
    Categories.create(req.body).then((response) => {
      res.send(response)
    }).catch((err)=>{
      res.send(err);
    })
  }

  update(req, res){
    Categories.update({
      name: req.body.data.name
    }, {
      where: {
        category_id: req.params.id
      }
    }).then((category) => {
      res.send(category);
    }).catch((err) => {
      res.send(err);
    });
  }

  destroy(req, res){
    Categories.destroy({
      where: {
        category_id: req.params.id
      }
    }).then(() => {
      res.send("Category was successfully deleted");
    }).catch((err) => {
      res.send(err);
    })
  }

}

module.exports = CategoriesController;
