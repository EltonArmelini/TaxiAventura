// Function to get Input Data
const getData = () => {
  return{
    mail : document.getElementById('email').value,
    subject : document.getElementById('subject').value,
    name : document.getElementById('name').value,
    msg : document.getElementById('msg').value,
    captcha : document.getElementById('captcha').value
  }

}
//Function to clean Input Data
const destroyData = () =>{
  document.getElementById('email').value= null;
  document.getElementById('subject').value= null;
  document.getElementById('name').value= null;
  document.getElementById('msg').value= null;
  document.getElementById('captcha').value= null;
}


// optionally, set maximum number of captcha validation on event:
const maxNumberOfTries = 3;

// captcha initial setup
var myCaptcha = new jCaptcha({
  el: '.jCaptcha',
  canvasClass: 'jCaptchaCanvas',
  canvasStyle: {
    // properties for captcha stylings
    width: 100,
    height: 15,
    textBaseline: 'top',
    font: '15px Arial',
    textAlign: 'left',
    fillStyle: '#000',
    left: '15px'
  },

  // set callback function
  callback: function(response, $captchaInputElement, numberOfTries) {
    if (maxNumberOfTries < numberOfTries) {
      document.getElementById("captcha").placeholder = "Intentos agotados";
      document.getElementById("form-submit").disabled = true;
    }

    if (response == 'success') {
      const dataToSend = getData();
      var element = document.getElementById("pop-up");
      $.ajax({
        type: "POST",
        url: "./mail_sender.php",
        data: dataToSend,
        success: function(data)
        {
            if (data == true)
            {
               element.classList.add("show_pop-up");
            }
            else
            {
                alert('Ha ocurrido un error!');
            }
       }
      });



      element.classList.add("show_pop-up");
    }

    if (response == 'error') {

      document.getElementById("captcha").placeholder = "Respuesta Incorrecta";

    }

  }

});
const form = document.getElementById('contact');
form.addEventListener('submit', e => {
  e.preventDefault();
  getData();
  myCaptcha.validate();
});

//Function to close PopUp when closebutton clicked
function closePopup() {
  var element = document.getElementById("pop-up");
  element.classList.remove("show_pop-up");
  destroyData();
}
