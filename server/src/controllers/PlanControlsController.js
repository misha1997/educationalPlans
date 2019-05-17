const PlanControls = require('../models/PlanControls');

class PlanControlsController{

  findOne(req, res){
    PlanControls.findAll({
      where: {
        id: req.params.id,
      }
    })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  create(req, res){
    let seriesRequests = async (req, res) => {
      try {
        await PlanControls.destroy({ where: { id: req.body.planId }});
        for(let i = 0; i < req.body.controls.length; i++) {
          req.body.controls[i].id = req.body.planId
          await PlanControls.create(req.body.controls[i]);
        }
        res.send(response);
      }catch (err) {
        res.send(err)
      }
    };
    seriesRequests(req, res);
  }

}

module.exports = PlanControlsController;
