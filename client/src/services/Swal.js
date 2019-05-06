module.exports = {

  successAlert(response){
    swal({
      title: "Success",
      text: response,
      icon: "success",
      button: "Ok!",
      timer: 1000
    });
  },

  errorAlert(response){
    swal({
      title: "Помилка",
      text: response,
      icon: "error",
      button: "Ok!",
      timer: 1000
    });
  }

}
