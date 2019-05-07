const DistributionOfControls = require('../models/DistributionOfControls');

class DistributionOfControlsController{

  findOne(req, res){
    DistributionOfControls.findOne({
      where: {
        education_item_id: req.params.id,
      }
    }).then((controls) => {
      res.send(controls);
    }).catch((err) => {
      res.send(err);
    });
  }

  create(req, res){
    req.body.data.education_item_id = req.body.educationItemId;
    let seriesRequests = async (req, res) => {
      try {
        await DistributionOfControls.destroy({ where: { education_item_id: req.body.educationItemId }});
        let response = await DistributionOfControls.create(req.body.data);
        res.send(response);
      }catch (err) {
        res.send(err)
      }
    };
    seriesRequests(req, res);
  }

  delete(req, res){
    DistributionOfControls.destroy({ 
      where: { 
        education_item_id: req.params.id 
      }
    })
    .then(() => {
      res.send("DistributionOfControls was successfully deleted");
    }).catch((err) => {
      res.send(err);
    })
  }

}

module.exports = DistributionOfControlsController;
