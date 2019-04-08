import Api from './Api';

export default{

  methods: {
    getSudivisions(){
      Api().get('asu')
        .then((response)=>{
          let data = _.filter(response.data.result, function(item) { return item.KOD_TYPE == 7 || item.KOD_TYPE == 8 });
          console.log(data);
        })
        .catch((err)=>{
          console.log(err)
        })
    },

    getDepartments(){
      Api().get('asu')
        .then((response)=>{
          let data = _.filter(response.data.result, function(item) { return item.KOD_TYPE == 2 });
          console.log(data);
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
 }
