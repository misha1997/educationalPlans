const async = require("async");
const _ = require('lodash');
const curl = new (require( 'curl-request' ))();
let Subdivision = require('../models/Subdivision');
let Departments = require('../models/Departments');

const key = 'wP3GUp8Lv3lB8rmbJ2cO4f4tcSJY3sCw';
const apiUrl = 'http://asu.sumdu.edu.ua/api/getDivisions?key='+key;



function parseData(response){
  let sudivisionsData = _.filter(JSON.parse(response).result, function(item) { return item.KOD_TYPE == 7 || item.KOD_TYPE == 8 || item.KOD_TYPE == 9});
  let departmentsData = _.filter(JSON.parse(response).result, function(item) { return item.KOD_TYPE == 2 });

  let subdivision = _.map(sudivisionsData, (item)=>{
    return {
      'api_id': item.ID_DIV,
      'name': item.NAME_DIV
    }
  });

  let departments = _.map(departmentsData, (item)=>{
    return {
      'api_id': item.ID_DIV,
      'parent_id': item.ID_PAR,
      'name': item.NAME_DIV
    }
  });

  return {
    "subdivision": subdivision,
    "departments": departments
  }
}

function departmentsFormatter(subdivisionDb, departmentsData){

  let departments = [];

  for(let i=0; i < departmentsData.length; i++){
    _.forEach(subdivisionDb, (item)=>{

      if(departmentsData[i].parent_id == item.api_id){
        departments.push({
          'subdivision_id': item.subdivision_id,
          'api_id': departmentsData[i].api_id,
          'name': departmentsData[i].name
        })
      }

    });
  }
  return departments;
}

async function store(response){
  let {subdivision, departments}  = parseData(response);

  try{
    await Subdivision.bulkCreate(subdivision);
    let subdivisionDb = await Subdivision.findAll();
    
    departments = departmentsFormatter(subdivisionDb, departments);
    await Departments.bulkCreate(departments);
  }catch(e){
    throw "Problem with saving data to DB";
  }
}

module.exports = {
  getAsuData(req, res){
    curl.get(apiUrl)
      .then(({body}) => {
        store(body);
        res.send('Data was successfully saved to data base');
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send({
          error: "Problem with API ASU"
        })
      });
  }
}
