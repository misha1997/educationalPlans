const _ = require('lodash');
const DistributionOfHours = require('../models/DistributionOfHours');

class DistributionOfHoursController{

  findAll(req, res){
    DistributionOfHours.findAll({
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

        await DistributionOfHours.destroy({ where: { education_item_id: req.body.educationItemId }});
        let response = await DistributionOfHours.bulkCreate(req.body.data);

        res.send(response);
      }catch (err) {
        res.send(err)
      }
    };

    seriesRequests(req, res);
  }
}


module.exports = DistributionOfHoursController;
