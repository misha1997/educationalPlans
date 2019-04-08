const Subjects = require('../models/Subjects');

class SubjectsController{

  index(req, res){
    Subjects.findAll().then((subject) => {
      res.send(subject);
    }).catch((err) => {
      res.send(err);
    });
  }

  show(req, res){
    Subjects.findAll({
      where: {
        subject_id: req.params.id
      }
    }).then((subject) => {
      res.send(subject);
    }).catch((err) => {
      res.send(err);
    });
  }

  store(req,res){
    Subjects.create(req.body).then((response) => {
      res.send(response)
    }).catch((err)=>{
      res.send(err);
    })
  }

  update(req, res){
    Subjects.update({
      name: req.body.data.name
    }, {
      where: {
        subject_id: req.params.id
      }
    }).then((subject) => {
      res.send(subject);
    }).catch((err) => {
      res.send(err);
    });
  }

  destroy(req, res){
    Subjects.destroy({
      where: {
        subject_id: req.params.id
      }
    }).then(() => {
      res.send("Subject was successfully deleted");
    }).catch((err) => {
      res.send(err);
    })
  }

}

module.exports = SubjectsController;
