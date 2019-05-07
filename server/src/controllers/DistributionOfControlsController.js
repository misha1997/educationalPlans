const _ = require('lodash');
const DistributionOfControls = require('../models/DistributionOfControls');

class DistributionOfControlsController{

  index(req, res){
    DistributionOfControls.findAll({
      where: {
        education_item_id: req.body.id,
      }
    })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  store(req, res){

    let seriesRequests = async (req, res) => {
      try {

        await DistributionOfControls.destroy({ where: { education_item_id: req.body.educationItemId }});
        let response = await DistributionOfControls.bulkCreate(req.body.data);

        res.send(response);
      }catch (err) {
        res.send(err)
      }
    };

    seriesRequests(req, res);
  }
}


module.exports = DistributionOfControlsController;
