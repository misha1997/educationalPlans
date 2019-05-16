const _ = require('lodash');
const PlanControls = require('../models/PlanControls');

class PlanControlsController{

  index(req, res){
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

}


module.exports = PlanControlsController;
